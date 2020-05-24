package serverless

import (
	"context"
	"errors"
	"testing"

	"github.com/aws/aws-lambda-go/events"
	"github.com/freshwebio/apydox-api/pkg/auth"
)

type mockAuthService struct{}

func (s *mockAuthService) GetGitHubAccessToken(code string) (string, error) {
	if code == "test-valid-code" {
		return "Afsdf0323930dasfasda", nil
	}
	return "", errors.New("Invalid code")
}

func (s *mockAuthService) CheckGitHubAccessToken(accessToken string) (auth.ValidTokenResponse, error) {
	if accessToken == "test-valid-access-token" {
		return auth.ValidTokenResponse{
			ValidToken: true,
		}, nil
	}
	return auth.ValidTokenResponse{}, nil
}

func (s *mockAuthService) RevokeAccessToken(accessToken string) error {
	if accessToken == "test-valid-access-token" {
		return nil
	}
	return errors.New("Server error")
}

func Test_checking_valid_access_token_produces_a_response_specifying_it_is_valid(t *testing.T) {
	services := make(map[string]interface{})
	services["auth.auth"] = &mockAuthService{}
	requestHandler := CheckAccessTokenRequestHandler(services)
	response, err := requestHandler(context.Background(), events.APIGatewayProxyRequest{
		Body: "{\"access_token\":\"test-valid-access-token\"}",
	})
	if err != nil {
		t.Errorf("Expected error to be nil for a valid access token but got %s", err)
	}
	if response.StatusCode != 200 {
		t.Errorf("Expected a 200 response but got %d", response.StatusCode)
	}
	if response.Body != "{\"validToken\":true,\"username\":\"\"}" {
		t.Errorf("Expected response body to be an object with validToken set to true but got %s", response.Body)
	}
}

func Test_checking_access_token_for_invalid_token_produces_a_response_with_a_401_response(t *testing.T) {
	services := make(map[string]interface{})
	services["auth.auth"] = &mockAuthService{}
	requestHandler := CheckAccessTokenRequestHandler(services)
	response, err := requestHandler(context.Background(), events.APIGatewayProxyRequest{
		Body: "{\"access_token\":\"test-invvalid-access-token\"}",
	})
	if err != nil {
		t.Errorf("Expected error to be nil for an invalid access token but got %s", err)
	}
	if response.StatusCode != 401 {
		t.Errorf("Expected response status code for an invalid token to be a 401 but got %d", response.StatusCode)
	}
	if response.Body != "{\"validToken\":false,\"username\":\"\"}" {
		t.Errorf("Expected response body to be an object with validToken set to false but got %s", response.Body)
	}
}

func Test_revoking_valid_access_token_is_successful(t *testing.T) {
	services := make(map[string]interface{})
	services["auth.auth"] = &mockAuthService{}
	requestHandler := RevokeAccessTokenRequestHandler(services)
	response, err := requestHandler(context.Background(), events.APIGatewayProxyRequest{
		Body: "{\"access_token\":\"test-valid-access-token\"}",
	})

	if err != nil {
		t.Errorf("Expected error to be nil for a valid access token but got %s", err)
	}

	if response.StatusCode != 200 {
		t.Errorf("Expected response status code for revoking a valid token to be a 200 but got %d", response.StatusCode)
	}

	if response.Body != "{}" {
		t.Errorf("Expected empty JSON object as response body but got %s", response.Body)
	}
}

func Test_revoking_empty_access_token_fails_with_400_response(t *testing.T) {
	services := make(map[string]interface{})
	services["auth.auth"] = &mockAuthService{}
	requestHandler := RevokeAccessTokenRequestHandler(services)
	response, err := requestHandler(context.Background(), events.APIGatewayProxyRequest{
		Body: "{\"access_token\":\"\"}",
	})

	if err != nil {
		t.Errorf("Expected error to be nil for an empty access token but got %s", err)
	}

	if response.StatusCode != 400 {
		t.Errorf("Expected a response status code of 400 for an empty access token but got %d", response.StatusCode)
	}
}

func Test_revoking_access_token_with_server_error_fails_with_500_response(t *testing.T) {
	services := make(map[string]interface{})
	services["auth.auth"] = &mockAuthService{}
	requestHandler := RevokeAccessTokenRequestHandler(services)
	response, err := requestHandler(context.Background(), events.APIGatewayProxyRequest{
		Body: "{\"access_token\":\"dasdasdAsdasddXCCXc\"}",
	})

	if err != nil {
		// The error gets handled and encapsulated by the API Gateway proxy response to return
		// an error response to the client.
		t.Errorf("Expected error to be nil for a server error but got %s", err)
	}

	if response.StatusCode != 500 {
		t.Errorf("Expected a response status code of 500 for a server error but got %d", response.StatusCode)
	}
}

func Test_retrieving_access_token_for_valid_code_produces_response_with_access_token(t *testing.T) {
	services := make(map[string]interface{})
	services["auth.auth"] = &mockAuthService{}
	requestHandler := RetrieveAccessTokenRequestHandler(services)

	response, err := requestHandler(context.Background(), events.APIGatewayProxyRequest{
		Body: "{\"code\": \"test-valid-code\"}",
	})
	if err != nil {
		t.Errorf("Expected error to be nil for a valid authorisation code but got %s", err)
	}

	if response.StatusCode != 200 {
		t.Errorf(
			"Expected status code to be 200 for a successful attempt to retrieve an access token but got %d",
			response.StatusCode,
		)
	}

	if response.Body != "{\"token\":\"Afsdf0323930dasfasda\"}" {
		t.Errorf(
			"Expected response body to contain the valid token response but received %s",
			response.Body,
		)
	}

}

func Test_retrieving_access_token_fails_for_malformed_json_with_400_response(t *testing.T) {
	services := make(map[string]interface{})
	services["auth.auth"] = &mockAuthService{}
	requestHandler := RetrieveAccessTokenRequestHandler(services)

	response, err := requestHandler(context.Background(), events.APIGatewayProxyRequest{
		Body: "{\"code\":\"test-valid-code\"",
	})
	if err != nil {
		t.Errorf("Expected a nil error returned for invalid JSON input")
	}

	if response.StatusCode != 400 {
		t.Errorf("Expected a 400 bad input response for an invalid JSON body but got %d", response.StatusCode)
	}

}

func Test_retrieving_access_token_with_server_error_fails_with_500_response(t *testing.T) {
	services := make(map[string]interface{})
	services["auth.auth"] = &mockAuthService{}
	requestHandler := RetrieveAccessTokenRequestHandler(services)

	response, err := requestHandler(context.Background(), events.APIGatewayProxyRequest{
		Body: "{\"code\":\"test-invalid-code\"}",
	})

	if err != nil {
		t.Errorf("Expected a nil error returned for a server error")
	}

	if response.StatusCode != 500 {
		t.Errorf("Expected an internal server error 500 reponse status code but got %d", response.StatusCode)
	}
}
