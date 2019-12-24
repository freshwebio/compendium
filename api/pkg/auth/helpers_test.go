package auth

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
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

func Test_setup_http_client_with_timeout(t *testing.T) {
	httpClient := SetupHTTPClient()
	if httpClient.Timeout != HTTPClientTimeout {
		t.Errorf("Expected a timeout of %v but got %v", HTTPClientTimeout, httpClient.Timeout)
	}
}

func Test_setup_basic_auth_http_client_with_timeout_and_credentials(t *testing.T) {
	clientID := "testid"
	clientSecret := "30f9gsdfk2fisdf"
	config := &core.Config{
		Github: &core.GithubConfig{
			ClientID:     &clientID,
			ClientSecret: &clientSecret,
		},
	}
	baClient := SetupBasicAuthHTTPClient(config)
	if baClient.Timeout != HTTPClientTimeout {
		t.Errorf("Expected a timeout of %v but got %v", HTTPClientTimeout, baClient.Timeout)
	}

	// Create a test server that requires basic auth credentials.
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user, pass, ok := r.BasicAuth()
		if !ok || user != "testid" || pass != "30f9gsdfk2fisdf" {
			core.HTTPError(w, 401, "Please provide valid basic auth credentials")
		} else {
			w.WriteHeader(200)
			responseBody, _ := json.Marshal(struct {
				Data []string `json:"data"`
			}{Data: []string{"1", "2", "3"}})
			w.Write(responseBody)
		}
	}))
	defer ts.Close()

	res, err := baClient.Get(ts.URL)
	if err != nil {
		t.Errorf("Expected a successful response for basic auth but recieved error %v", err)
	}

	if res.StatusCode != 200 {
		t.Errorf("Expected a 200 http response status code but received %v", res.StatusCode)
	}

	respData, err := ioutil.ReadAll(res.Body)
	res.Body.Close()
	if err != nil {
		t.Errorf("Expected to decode the response body but failed with %v", err)
	}

	expectedBody := "{\"data\":[\"1\",\"2\",\"3\"]}"
	if string(respData) != expectedBody {
		t.Errorf("Expected %v but received %v", expectedBody, respData)
	}
}
