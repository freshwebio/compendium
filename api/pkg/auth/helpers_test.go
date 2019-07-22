package auth

import (
	"testing"

	"github.com/freshwebio/apydox-api/pkg/core"
)

func Test_produces_correct_oauth_request_body_for_github_authentication(t *testing.T) {
	clientID := "sdf0329dfsdf032"
	clientSecret := "fsd04923fadf0e12dasdasfdasldkdsd"
	config := &core.Config{
		Github: &core.GithubConfig{
			ClientID:     &clientID,
			ClientSecret: &clientSecret,
		},
	}
	oauthRequestBody := BuildGithubOAuthBody(config, "gdfgdfg0392323")
	if oauthRequestBody != "client_id=sdf0329dfsdf032&client_secret=fsd04923fadf0e12dasdasfdasldkdsd&code=gdfgdfg0392323" {
		t.Errorf("An incorrect OAuth request body was produced: %s", oauthRequestBody)
	}
}
