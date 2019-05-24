
package core

import (
	"net/http"
	"encoding/json"
)

// HTTPError writes http error responses with a message represented in a JSON object.
func HTTPError(w http.ResponseWriter, statusCode int, message string) {
	w.WriteHeader(statusCode)
	errorResponse, _ := json.Marshal(struct{ Message string `json:"message"` }{ message })
	w.Write(errorResponse)
}
