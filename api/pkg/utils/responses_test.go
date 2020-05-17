package utils

import "testing"

func Test_a_correct_server_error_http_response_is_produced(t *testing.T) {
	errResponse := ServerError()
	if errResponse.StatusCode != 500 {
		t.Errorf("Error response contains an incorrect status code; expected: 500 got: %d", errResponse.StatusCode)
	}
	messageJSON := "{\"message\":\"" + ServerErrorMessage + "\"}"
	if string(errResponse.Body) != messageJSON {
		t.Errorf("Error response does not contain the correct message; expected: %s got: %s", messageJSON, string(errResponse.Body))
	}
	// Loose check for existence of headers as the utility function in charge of providing the correct headers should
	// have it's own tests.
	if len(errResponse.Headers) == 0 {
		t.Error("Error response does not contain any of the headers provided by the header utility.")
	}
}

func Test_a_correct_bad_request_error_http_response_is_produced_when_no_message_is_provided(t *testing.T) {
	errResponse := BadRequestError("")
	if errResponse.StatusCode != 400 {
		t.Errorf("Error response contains an incorrect status code; expected: 400 got: %d", errResponse.StatusCode)
	}
	messageJSON := "{\"message\":\"" + BadRequestMessage + "\"}"
	if string(errResponse.Body) != messageJSON {
		t.Errorf("Error response does not contain the correct message; expected: %s got: %s", messageJSON, string(errResponse.Body))
	}
	// Loose check for existence of headers as the utility function in charge of providing the correct headers should
	// have it's own tests.
	if len(errResponse.Headers) == 0 {
		t.Error("Error response does not contain any of the headers provided by the header utility.")
	}
}

func Test_a_correct_bad_request_error_http_response_is_produced_when_a_message_is_provided(t *testing.T) {
	errResponse := BadRequestError("Invalid JSON payload")
	if errResponse.StatusCode != 400 {
		t.Errorf("Error response contains an incorrect status code; expected: 400 got: %d", errResponse.StatusCode)
	}
	messageJSON := "{\"message\":\"Invalid JSON payload\"}"
	if string(errResponse.Body) != messageJSON {
		t.Errorf("Error response does not contain the correct message; expected: %s got: %s", messageJSON, string(errResponse.Body))
	}
	// Loose check for existence of headers as the utility function in charge of providing the correct headers should
	// have it's own tests.
	if len(errResponse.Headers) == 0 {
		t.Error("Error response does not contain any of the headers provided by the header utility.")
	}
}
