package serverless

import (
	"context"
	"testing"

	"github.com/aws/aws-lambda-go/events"
	"github.com/freshwebio/apydox-api/pkg/utils"
)

func testResponse(resp events.APIGatewayProxyResponse, expectedStatusCode int, expectedBody string, t *testing.T) {
	if resp.StatusCode != expectedStatusCode {
		t.Errorf("Expected a resulting status code of %d but received %d", expectedStatusCode, resp.StatusCode)
	}
	if resp.Body != expectedBody {
		t.Errorf("Expected a JSON string of the form %s as the response body but received %s", expectedBody, resp.Body)
	}
}

func TestBaseHandlerPingRequest(t *testing.T) {
	mainHandlerCreator := func(services map[string]interface{}) RequestHandler {
		return func(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
			return events.APIGatewayProxyResponse{}, nil
		}
	}
	baseHandler := CreateBaseHandler(mainHandlerCreator)
	pingRequest := events.APIGatewayProxyRequest{Body: "{\"ping\":true}"}
	resp, err := baseHandler(context.Background(), pingRequest)
	if err != nil {
		t.Errorf("Expected error to be nil and a ping response to be returned but received an error: %s", err)
	}
	testResponse(resp, 200, "{}", t)
	// Do a simple check against the amount of headers we expect to be returned
	// given the utils.SetHeaders() function is used, as SetHeaders has it's own tests.
	expectedHeaders := utils.SetHeaders(nil, false)
	expectedHeadersLen := len(expectedHeaders)
	headersLen := len(resp.Headers)
	if expectedHeadersLen != headersLen {
		t.Errorf("Expected %d headers to be set but received %d headers instead", expectedHeadersLen, headersLen)
	}
}

func TestBaseHandlerWithMainRequestHandler(t *testing.T) {
	mainHandlerCreator := func(services map[string]interface{}) RequestHandler {
		return func(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
			return events.APIGatewayProxyResponse{StatusCode: 200, Body: "{\"success\":true,\"results\":[\"Value1\",\"Value2\"]}"}, nil
		}
	}
	baseHandler := CreateBaseHandler(mainHandlerCreator)
	request := events.APIGatewayProxyRequest{PathParameters: map[string]string{
		"search": "Value",
	}}
	resp, err := baseHandler(context.Background(), request)
	if err != nil {
		t.Errorf("Expected error to be nil and a valid request to be returned")
	}
	testResponse(resp, 200, "{\"success\":true,\"results\":[\"Value1\",\"Value2\"]}", t)
}
