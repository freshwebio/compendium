package utils

import "testing"

func TestServerError(t *testing.T) {
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
