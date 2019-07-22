package utils

import (
	"testing"

	"github.com/aws/aws-lambda-go/events"
)

func Test_a_correct_200_response_is_produced_for_a_ping_request(t *testing.T) {
	response := HandlePing(events.APIGatewayProxyRequest{
		Body: "{\"ping\":true}",
	})
	if response == nil {
		t.Errorf("Expected ping response but received nil instead")
	}

	if response.StatusCode != 200 {
		t.Errorf("Expected 200 response status code for a ping request but received %d", response.StatusCode)
	}
}

func Test_a_nil_response_is_produced_for_a_non_ping_request(t *testing.T) {
	response := HandlePing(events.APIGatewayProxyRequest{
		Body: "{\"other_request\":true}",
	})
	if response != nil {
		t.Errorf("Expected nil response for a request that is not a ping but received a response object %+v", response)
	}
}

func Test_a_nil_response_is_produced_for_malformed_json_input(t *testing.T) {
	response := HandlePing(events.APIGatewayProxyRequest{
		Body: "{\"other_request\":true",
	})
	if response != nil {
		t.Errorf("Expected nil response for a request that is not a valid request body received a response object %+v", response)
	}
}
