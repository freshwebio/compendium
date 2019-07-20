package auth

import (
	"context"
	"net/http"
	"testing"

	"github.com/google/go-github/github"
)

type mockHTTPClient struct{}

func (c *mockHTTPClient) Do(req *http.Request) (*http.Response, error) {}

type mockAuthorisationsClient struct{}

func (c *mockAuthorisationsClient) Revoke(ctx context.Context, clientID string, token string) (*github.Response, error) {
}

func (c *mockAuthorisationsClient) Check(ctx context.Context, clientID string, token string) (*github.Authorization, *github.Response, error) {

}
func Test_retrieving_github_access_token_produces_valid_token(t *testing.T) {

}

func Test_retrieving_github_access_token_produces_error_for_invalid_json(t *testing.T) {

}

func Test_retrieving_github_access_token_produces_error_for_server_error(t *testing.T) {

}

func Test_github_access_token_is_valid(t *testing.T) {

}

func Test_github_access_token_is_not_valid(t *testing.T) {

}

func Test_github_access_token_check_server_error(t *testing.T) {

}

func Test_revoking_existing_github_access_token_is_successful(t *testing.T) {

}

func Test_revoking_non_existent_github_access_token_fails(t *testing.T) {

}
