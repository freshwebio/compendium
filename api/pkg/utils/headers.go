package utils

import (
	"net/http"
)

// SetHeaders sets the headers for a response writer if provided,
// otherwise it returns the headers as a map.
func SetHeaders(w http.ResponseWriter) map[string]string {
	if w != nil {
		w.Header().Add("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type, Accept")
		w.Header().Add("Access-Control-Max-Age", "3600")
		w.Header().Add("Content-Type", "application/json")
		return nil
	}
	return map[string]string{
		"Access-Control-Allow-Origin":  "*",
		"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
		"Access-Control-Allow-Headers": "Content-Type, Accept",
		"Access-Control-Max-Age":       "3600",
		"Content-Type":                 "application/json",
	}
}
