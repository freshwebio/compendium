package core

import (
	"encoding/json"
	"net/http"
)

// HTTPClient provides an abstraction for any type of http client
// that can send a http request.
type HTTPClient interface {
	Do(req *http.Request) (*http.Response, error)
}

// HTTPError writes http error responses with a message represented in a JSON object.
func HTTPError(w http.ResponseWriter, statusCode int, message string) {
	w.WriteHeader(statusCode)
	errorResponse, _ := json.Marshal(struct {
		Message string `json:"message"`
	}{message})
	w.Write(errorResponse)
}
