package auth

import (
	"errors"
	"io/ioutil"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/julienschmidt/httprouter"
)

type mockAuthService struct{}

func (s *mockAuthService) GetGitHubAccessToken(code string) (string, error) {
	if code == "validCode" {
		return "gsdfsdfSDfsdfRWEqsdqsda", nil
	} else if code == "serverError" {
		return "", errors.New("Unexpected error occurred")
	}
	return "", nil
}

func (s *mockAuthService) CheckGitHubAccessToken(token string) (bool, error) {
	if token == "validToken" {
		return true, nil
	} else if token == "serverError" {
		return false, errors.New("Unexpected error occurred")
	}
	return false, nil
}

func (s *mockAuthService) RevokeAccessToken(token string) error {
	if token == "validToken" {
		return nil
	} else if token == "serverError" {
		return errors.New("Unexpected error occurred")
	}
	return nil
}

func Test_retrieving_valid_github_access_token_produces_response_with_token(t *testing.T) {
	ctrl := NewController(&mockAuthService{})
	recorder := httptest.NewRecorder()
	request := httptest.NewRequest("POST", "https://test.test", strings.NewReader("{\"code\":\"validCode\"}"))
	ctrl.GetGitHubAccessToken(recorder, request, httprouter.Params{})
	res := recorder.Result()
	if res.StatusCode != 200 {
		t.Errorf("Expected response code to be status 200 but received %d", res.StatusCode)
	}
	bodyBytes, _ := ioutil.ReadAll(res.Body)
	if string(bodyBytes) != "{\"token\":\"gsdfsdfSDfsdfRWEqsdqsda\"}" {
		t.Errorf("Expected token response body to be a JSON object with the token gsdfsdfSDfsdfRWEqsdqsda but received %s", string(bodyBytes))
	}
}

func Test_retrieving_github_access_token_with_malformed_json_produces_400_error(t *testing.T) {
	ctrl := NewController(&mockAuthService{})
	recorder := httptest.NewRecorder()
	request := httptest.NewRequest("POST", "https://test.test", strings.NewReader("\"code\":\"validCode\""))
	ctrl.GetGitHubAccessToken(recorder, request, httprouter.Params{})
	res := recorder.Result()
	if res.StatusCode != 400 {
		t.Errorf("Expected response code to be status 400 but received %d", res.StatusCode)
	}
}

func Test_retrieving_github_access_token_failing_with_server_error_produces_500_error(t *testing.T) {
	ctrl := NewController(&mockAuthService{})
	recorder := httptest.NewRecorder()
	request := httptest.NewRequest("POST", "https://test.test", strings.NewReader("{\"code\":\"serverError\"}"))
	ctrl.GetGitHubAccessToken(recorder, request, httprouter.Params{})
	res := recorder.Result()
	if res.StatusCode != 500 {
		t.Errorf("Expected response code to be status 500 but received %d", res.StatusCode)
	}
}

func Test_checking_valid_github_access_token_produces_response_specifying_it_is_valid(t *testing.T) {
	ctrl := NewController(&mockAuthService{})
	recorder := httptest.NewRecorder()
	request := httptest.NewRequest("POST", "https://test.test", strings.NewReader("{\"access_token\":\"validToken\"}"))
	ctrl.CheckGitHubAccessToken(recorder, request, httprouter.Params{})
	res := recorder.Result()
	if res.StatusCode != 200 {
		t.Errorf("Expected response code to be status 200 but received %d", res.StatusCode)
	}
	bodyBytes, _ := ioutil.ReadAll(res.Body)
	if string(bodyBytes) != "{\"validToken\":true}" {
		t.Errorf("Expected token response body to be a JSON object with the true for the validToken property but received %s", string(bodyBytes))
	}
}

func Test_checking_empty_github_access_token_produces_a_401_unauthenticated_response(t *testing.T) {
	ctrl := NewController(&mockAuthService{})
	recorder := httptest.NewRecorder()
	request := httptest.NewRequest("POST", "https://test.test", strings.NewReader("{\"access_token\":\"\"}"))
	ctrl.CheckGitHubAccessToken(recorder, request, httprouter.Params{})
	res := recorder.Result()
	if res.StatusCode != 401 {
		t.Errorf("Expected response code to be status 401 but received %d", res.StatusCode)
	}
}

func Test_checking_github_access_token_failing_with_server_error_produces_a_500_response(t *testing.T) {
	ctrl := NewController(&mockAuthService{})
	recorder := httptest.NewRecorder()
	request := httptest.NewRequest("POST", "https://test.test", strings.NewReader("{\"access_token\":\"serverError\"}"))
	ctrl.CheckGitHubAccessToken(recorder, request, httprouter.Params{})
	res := recorder.Result()
	if res.StatusCode != 500 {
		t.Errorf("Expected response code to be status 500 but received %d", res.StatusCode)
	}
}

func Test_revoking_valid_github_access_token_is_successful(t *testing.T) {
	ctrl := NewController(&mockAuthService{})
	recorder := httptest.NewRecorder()
	request := httptest.NewRequest("DELETE", "https://test.test", strings.NewReader("{\"access_token\":\"validToken\"}"))
	ctrl.RevokeGitHubAccessToken(recorder, request, httprouter.Params{})
	res := recorder.Result()
	if res.StatusCode != 200 {
		t.Errorf("Expected response code to be status 200 but received %d", res.StatusCode)
	}
	bodyBytes, _ := ioutil.ReadAll(res.Body)
	if string(bodyBytes) != "{}" {
		t.Errorf("Expected token response body to be an empty JSON object but received %s", string(bodyBytes))
	}
}

func Test_revoking_empty_github_access_token_fails_with_400_response(t *testing.T) {
	ctrl := NewController(&mockAuthService{})
	recorder := httptest.NewRecorder()
	request := httptest.NewRequest("DELETE", "https://test.test", strings.NewReader("{\"access_token\":\"\"}"))
	ctrl.RevokeGitHubAccessToken(recorder, request, httprouter.Params{})
	res := recorder.Result()
	if res.StatusCode != 400 {
		t.Errorf("Expected response code to be status 400 but received %d", res.StatusCode)
	}
}

func Test_revoking_github_access_token_failure_with_server_error_produces_500_response(t *testing.T) {
	ctrl := NewController(&mockAuthService{})
	recorder := httptest.NewRecorder()
	request := httptest.NewRequest("DELETE", "https://test.test", strings.NewReader("{\"access_token\":\"serverError\"}"))
	ctrl.RevokeGitHubAccessToken(recorder, request, httprouter.Params{})
	res := recorder.Result()
	if res.StatusCode != 500 {
		t.Errorf("Expected response code to be status 500 for a server error but received %d", res.StatusCode)
	}
}
