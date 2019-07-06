package auth

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/freshwebio/apydox-api/pkg/core"
	"github.com/google/go-github/github"
)

// Service provides the functionality that interacts with
// github for authorisation.
type Service interface {
	GetGitHubAccessToken(code string) (string, error)
	CheckGitHubAccessToken(token string) (bool, error)
	RevokeAccessToken(token string) error
}

type serviceImpl struct {
	config               *core.Config
	client               core.HTTPClient
	authorisationsClient GithubAuthorisationsClient
}

func (s *serviceImpl) GetGitHubAccessToken(code string) (token string, err error) {
	body := BuildGithubOAuthBody(s.config, code)
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
	err = json.Unmarshal(bytes, &tokenHolder)
	token = tokenHolder.AccessToken
	return
}

func (s *serviceImpl) CheckGitHubAccessToken(token string) (validToken bool, err error) {
	ctx := context.Background()
	_, resp, err := s.authorisationsClient.Check(ctx, *s.config.Github.ClientID, token)
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
	ctx := context.Background()
	_, err = s.authorisationsClient.Revoke(ctx, *s.config.Github.ClientID, token)
	return
}

// NewService creates a new instance of a service that connects the portal with github
// to manage user access to the portal. This takes the github authorisations client
// and client for retrieving access token as dependencies.
func NewService(config *core.Config, httpClient core.HTTPClient, authorisationsClient GithubAuthorisationsClient) Service {
	return &serviceImpl{config, httpClient, authorisationsClient}
}

// NewDefaultService creates a new instance of a service that connects the portal with github.
// This deals with setting up the github authorisations client for you based off of the provided configuration.
func NewDefaultService(config *core.Config) Service {
	basicAuthClient := SetupBasicAuthHTTPClient(config)
	ghClient := github.NewClient(basicAuthClient)

	return &serviceImpl{config, SetupHTTPClient(), ghClient.Authorizations}
}
