package core

import (
	"io/ioutil"
	"net/http/httptest"
	"testing"
)

func Test_writing_error_http_response(t *testing.T) {
	recorder := httptest.NewRecorder()
	HTTPError(recorder, 400, "Data validation failed")
	result := recorder.Result()
	if result.StatusCode != 400 {
		t.Errorf("Expected error response status code to be 400 but received %d", result.StatusCode)
	}
	body, err := ioutil.ReadAll(result.Body)
	result.Body.Close()

	if err != nil {
		t.Errorf("Expected to successfully read request body but failed with %v", err)
	}

	expectedBody := "{\"message\":\"Data validation failed\"}"
	if string(body) != expectedBody {
		t.Errorf("Expected error response body to be %s but received %s", string(body), expectedBody)
	}
}
