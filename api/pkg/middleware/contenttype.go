package middleware

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

// ContentType provides the middleware for setting content type headers
// for responses to requests that are not preflights.
type ContentType struct {
	contentType string
}

// NewContentType instantiates a new content type middleware to be used
// for api endpoint handlers.
func NewContentType(cType string) *ContentType {
	return &ContentType{cType}
}

func (c *ContentType) ServeHTTP(w http.ResponseWriter, r *http.Request, ps httprouter.Params, next http.HandlerFunc) {
	if r.Method != "OPTIONS" {
		w.Header().Add("Content-Type", c.contentType)
	}
	next(w, r)
}
