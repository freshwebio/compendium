package auth

import (
	"context"
	"net/http"
	"time"

	"github.com/freshwebio/apydox-api/pkg/core"
	"github.com/google/go-github/v31/github"
)

// HTTPClientTimeout provides the timeout to be used
// http clients in the apydox api.
var HTTPClientTimeout = time.Second * 10

// GithubAuthorisationsClient provides an abstraction for the set of functionality
// used in this application for interacting with github's authorization api endpoints.
type GithubAuthorisationsClient interface {
	Revoke(ctx context.Context, clientID string, token string) (*github.Response, error)
	Check(ctx context.Context, clientID string, token string) (*github.Authorization, *github.Response, error)
}

// SetupBasicAuthHTTPClient creates a new http client with basic auth transport attached for every request
// that is made.
func SetupBasicAuthHTTPClient(config *core.Config) *http.Client {
	transport := &github.BasicAuthTransport{
		Username: *config.Github.ClientID,
		Password: *config.Github.ClientSecret,
	}
	client := transport.Client()
	client.Timeout = HTTPClientTimeout
	return client
}

// SetupHTTPClient sets up a basic http client with a 10 second timeout.
func SetupHTTPClient() *http.Client {
	return &http.Client{
		Timeout: HTTPClientTimeout,
	}
}

// BuildGithubOAuthBody generates the urlencoded body string for an oauth
// request to get an access token from github.
func BuildGithubOAuthBody(config *core.Config, code string) string {
	return "client_id=" + *config.Github.ClientID + "&client_secret=" + *config.Github.ClientSecret + "&code=" + code
}
