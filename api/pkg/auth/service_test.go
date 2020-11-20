package auth

import (
	"context"
	"errors"
	"io/ioutil"
	"net/http"
	"strings"
	"testing"

	"github.com/freshwebio/compendium-api/pkg/core"
	"github.com/google/go-github/v31/github"
)

type mockHTTPClient struct{}

func (c *mockHTTPClient) Do(req *http.Request) (*http.Response, error) {
	requestBody, _ := ioutil.ReadAll(req.Body)

	clientID := "validClientID"
	clientSecret := "validClientSecret"
	config := &core.Config{
		Github: &core.GithubConfig{
			ClientID:     &clientID,
			ClientSecret: &clientSecret,
		},
	}
	validRequestBody := BuildGithubOAuthBody(config, "validCode")

	invalidJSONClientID := "invalidJSONClientID"
	invalidJSONClientSecret := "invalidJSONClientSecret"
	invalidJSONConfig := &core.Config{
		Github: &core.GithubConfig{
			ClientID:     &invalidJSONClientID,
			ClientSecret: &invalidJSONClientSecret,
		},
	}
	invalidJSONRequestBody := BuildGithubOAuthBody(invalidJSONConfig, "invalidJSONCode")

	serverErrorClientID := "serverErrorClientID"
	serverErrorClientSecret := "serverErrorClientSecret"
	serverErrorConfig := &core.Config{
		Github: &core.GithubConfig{
			ClientID:     &serverErrorClientID,
			ClientSecret: &serverErrorClientSecret,
		},
	}
	serverErrorRequestBody := BuildGithubOAuthBody(serverErrorConfig, "serverErrorCode")

	if string(requestBody) == validRequestBody {
		return &http.Response{
			Body: ioutil.NopCloser(strings.NewReader("{\"access_token\":\"validToken\"}")),
		}, nil
	} else if string(requestBody) == invalidJSONRequestBody {
		return &http.Response{
			Body: ioutil.NopCloser(strings.NewReader("\"access_token\":\"validToken\"")),
		}, nil
	} else if string(requestBody) == serverErrorRequestBody {
		return nil, errors.New("Network error")
	}
	return nil, nil
}

type mockAuthorisationsClient struct{}

func (c *mockAuthorisationsClient) Check(ctx context.Context, clientID string, token string) (*github.Authorization, *github.Response, error) {
	if token == "validToken" {
		return nil, &github.Response{
			Response: &http.Response{
				StatusCode: 200,
			},
			NextPage:  0,
			PrevPage:  0,
			FirstPage: 0,
			LastPage:  0,
		}, nil
	} else if token == "invalidToken" {
		return nil, &github.Response{
			Response: &http.Response{
				StatusCode: 404,
			},
			NextPage:  0,
			PrevPage:  0,
			FirstPage: 0,
			LastPage:  0,
		}, nil
	} else if token == "serverErrorToken" {
		return nil, &github.Response{
			Response: &http.Response{
				StatusCode: 500,
			},
			NextPage:  0,
			PrevPage:  0,
			FirstPage: 0,
			LastPage:  0,
		}, errors.New("Server error")
	}
	return nil, nil, nil
}

func (c *mockAuthorisationsClient) Revoke(ctx context.Context, clientID string, token string) (*github.Response, error) {
	if token == "vaildToken" {
		return nil, nil
	} else if token == "invalidToken" {
		return nil, errors.New("Invalid token provided")
	}
	return nil, nil
}

func Test_retrieving_github_access_token_produces_valid_token(t *testing.T) {
	clientID := "validClientID"
	clientSecret := "validClientSecret"
	config := &core.Config{
		Github: &core.GithubConfig{
			ClientID:     &clientID,
			ClientSecret: &clientSecret,
		},
	}
	client := NewService(config, &mockHTTPClient{}, &mockAuthorisationsClient{})
	token, err := client.GetGitHubAccessToken("validCode")
	if err != nil {
		t.Errorf("Expected error to be nil for a valid code but received %s", err)
	}
	if token != "validToken" {
		t.Errorf("Expected the token \"validToken\" to be produced but received %s", token)
	}
}

func Test_retrieving_github_access_token_produces_error_for_invalid_json(t *testing.T) {
	clientID := "invalidJSONClientID"
	clientSecret := "invalidJSONClientSecret"
	config := &core.Config{
		Github: &core.GithubConfig{
			ClientID:     &clientID,
			ClientSecret: &clientSecret,
		},
	}
	client := NewService(config, &mockHTTPClient{}, &mockAuthorisationsClient{})
	_, err := client.GetGitHubAccessToken("invalidJSONCode")
	if err == nil {
		t.Errorf("Expected error to due to invalid json but received nil")
	}
}

func Test_retrieving_github_access_token_produces_error_for_server_error(t *testing.T) {
	clientID := "serverErrorClientID"
	clientSecret := "serverErrorClientSecret"
	config := &core.Config{
		Github: &core.GithubConfig{
			ClientID:     &clientID,
			ClientSecret: &clientSecret,
		},
	}
	client := NewService(config, &mockHTTPClient{}, &mockAuthorisationsClient{})
	_, err := client.GetGitHubAccessToken("serverErrorCode")
	if err == nil {
		t.Errorf("Expected error to be present to due to a server error but received nil")
	}
}

func Test_github_access_token_is_valid(t *testing.T) {
	clientID := "clientId"
	clientSecret := "clientSecret"
	config := &core.Config{
		Github: &core.GithubConfig{
			ClientID:     &clientID,
			ClientSecret: &clientSecret,
		},
	}
	client := NewService(config, &mockHTTPClient{}, &mockAuthorisationsClient{})
	isValid, err := client.CheckGitHubAccessToken("validToken")
	if !isValid {
		t.Errorf("Expected the token to be valid")
	}
	if err != nil {
		t.Errorf("Expected error to be nil for a valid token but received %s", err)
	}
}

func Test_github_access_token_is_not_valid(t *testing.T) {
	clientID := "clientId"
	clientSecret := "clientSecret"
	config := &core.Config{
		Github: &core.GithubConfig{
			ClientID:     &clientID,
			ClientSecret: &clientSecret,
		},
	}
	client := NewService(config, &mockHTTPClient{}, &mockAuthorisationsClient{})
	isValid, _ := client.CheckGitHubAccessToken("invalidToken")
	if isValid {
		t.Errorf("Expected the token to be invalid")
	}
}

func Test_github_access_token_check_server_error(t *testing.T) {
	clientID := "clientId"
	clientSecret := "clientSecret"
	config := &core.Config{
		Github: &core.GithubConfig{
			ClientID:     &clientID,
			ClientSecret: &clientSecret,
		},
	}
	client := NewService(config, &mockHTTPClient{}, &mockAuthorisationsClient{})
	_, err := client.CheckGitHubAccessToken("serverErrorToken")
	if err == nil {
		t.Errorf("Expected error to have a value for server error but received nil")
	}
}

func Test_revoking_existing_github_access_token_is_successful(t *testing.T) {
	clientID := "clientId"
	clientSecret := "clientSecret"
	config := &core.Config{
		Github: &core.GithubConfig{
			ClientID:     &clientID,
			ClientSecret: &clientSecret,
		},
	}
	client := NewService(config, &mockHTTPClient{}, &mockAuthorisationsClient{})
	err := client.RevokeAccessToken("validToken")
	if err != nil {
		t.Errorf("Expected error to be nil but received %s", err)
	}
}

func Test_revoking_non_existent_github_access_token_fails(t *testing.T) {
	clientID := "clientId"
	clientSecret := "clientSecret"
	config := &core.Config{
		Github: &core.GithubConfig{
			ClientID:     &clientID,
			ClientSecret: &clientSecret,
		},
	}
	client := NewService(config, &mockHTTPClient{}, &mockAuthorisationsClient{})
	err := client.RevokeAccessToken("invalidToken")
	if err == nil {
		t.Errorf("Expected error to be returned but received error %s", err)
	}
}
