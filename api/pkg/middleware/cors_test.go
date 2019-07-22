package middleware

import (
	"bytes"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/julienschmidt/httprouter"
)

func Test_cors_headers_are_added_to_http_response_and_main_handler_response_is_produced(t *testing.T) {
	corsMiddleware := NewCORS()
	nextHandler := func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("{\"result\":true}"))
	}
	recorder := httptest.NewRecorder()
	request := httptest.NewRequest("GET", "https://api.example.com", bytes.NewReader([]byte("")))
	corsMiddleware.ServeHTTP(recorder, request, httprouter.Params{}, nextHandler)
	responseResult := recorder.Result()
	if responseResult.StatusCode != http.StatusOK {
		t.Errorf("Expected response status code to be %d but received a status code of %d", http.StatusOK, responseResult.StatusCode)
	}
	bodyBytes, _ := ioutil.ReadAll(responseResult.Body)
	bodyStr := string(bodyBytes)
	if bodyStr != "{\"result\":true}" {
		t.Errorf("Expected response body of {\"result\":true} but received a body of %s", bodyStr)
	}
	// utils.SetHeaders takes care of testing the actual header values,
	// at this point we just want to make sure the right amount of headers were set.
	if len(responseResult.Header) != 4 {
		t.Errorf("Expected 4 cors headers to be set but received %d", len(responseResult.Header))
	}
}
