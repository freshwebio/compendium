package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"time"

	"github.com/freshwebio/apydox-api/pkg/core"
	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

// Service provides the functionality that interacts with
// github for authorisation.
type Service interface {
	GetGitHubAccessToken(code string) (string, error)
	CheckGitHubAccessToken(token string) (bool, error)
	RevokeAccessToken(token string) error
}

type serviceImpl struct {
	config *core.Config
	client *http.Client
}

func (s *serviceImpl) GetGitHubAccessToken(code string) (token string, err error) {
	body := "client_id=" + *s.config.Github.ClientID + "&client_secret=" + *s.config.Github.ClientSecret + "&code=" + code
	fmt.Printf("request to github: %s\n", body)
	request, _ := http.NewRequest("POST", "https://github.com/login/oauth/access_token", strings.NewReader(body))
	request.Header.Add("Accept", "application/json")
	var response *http.Response
	response, err = s.client.Do(request)
	if err != nil {
		return
	}
	var tokenHolder struct {
		AccessToken string `json:"access_token"`
	}
	bytes, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return
	}
	fmt.Printf("response from github: %s\n", string(bytes))

	err = json.Unmarshal(bytes, &tokenHolder)
	token = tokenHolder.AccessToken
	// err = json.NewDecoder(response.Body).Decode(&tokenHolder)
	// if err != nil {
	//	return
	// }
	return
}

func (s *serviceImpl) CheckGitHubAccessToken(token string) (validToken bool, err error) {
	basicAuthClient := s.setupBasicAuthHTTPClient()
	ghClient := github.NewClient(basicAuthClient)
	ctx := context.Background()
	_, resp, err := ghClient.Authorizations.Check(ctx, *s.config.Github.ClientID, token)
	if err != nil && resp.StatusCode >= 500 {
		return
	}
	// 404 not found represents a bad token and is a valid response,
	// 200 is the only success case, so ensure the error is reset to nil.
	err = nil
	if resp.StatusCode == 200 {
		validToken = true
	}
	return
}

func (s *serviceImpl) RevokeAccessToken(token string) (err error) {
	basicAuthClient := s.setupBasicAuthHTTPClient()
	ghClient := github.NewClient(basicAuthClient)
	ctx := context.Background()
	_, err = ghClient.Authorizations.Revoke(ctx, *s.config.Github.ClientID, token)
	return
}

func (s *serviceImpl) setupBasicAuthHTTPClient() *http.Client {
	transport := &github.BasicAuthTransport{
		Username: *s.config.Github.ClientID,
		Password: *s.config.Github.ClientSecret,
	}
	client := transport.Client()
	client.Timeout = time.Second * 10
	return client
}

func setupHTTPClient() *http.Client {
	return &http.Client{
		Timeout: time.Second * 10,
	}
}

func setupOAuthClient(token string) *http.Client {
	ctx := context.Background()
	ts := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: token})
	return oauth2.NewClient(ctx, ts)
}

// NewService creates a new instance of a service that connects the portal with github
// to manage user access to the portal.
func NewService(config *core.Config) Service {
	return &serviceImpl{config, setupHTTPClient()}
}
