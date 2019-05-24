package middleware

import (
	"bytes"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/julienschmidt/httprouter"
)

func TestContentType(t *testing.T) {
	contentTypeMw := NewContentType("application/json")
	nextHandler := func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("{\"result\":true}"))
	}
	recorder := httptest.NewRecorder()
	request := httptest.NewRequest("GET", "https://api.example.com", bytes.NewReader([]byte("")))
	contentTypeMw.ServeHTTP(recorder, request, httprouter.Params{}, nextHandler)
	responseResult := recorder.Result()
	if responseResult.StatusCode != http.StatusOK {
		t.Errorf("Expected response status code to be %d but received a status code of %d", http.StatusOK, responseResult.StatusCode)
	}
	bodyBytes, _ := ioutil.ReadAll(responseResult.Body)
	bodyStr := string(bodyBytes)
	if bodyStr != "{\"result\":true}" {
		t.Errorf("Expected response body of {\"result\":true} but received a body of %s", bodyStr)
	}
	contentTypeHeader := responseResult.Header.Get("Content-Type")
	if contentTypeHeader != "application/json" {
		t.Errorf("Expected content type of response to be application/json but received %s", contentTypeHeader)
	}
}
