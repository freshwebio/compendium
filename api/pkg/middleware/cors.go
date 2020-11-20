package middleware

import (
	"net/http"

	"github.com/freshwebio/compendium-api/pkg/utils"
	"github.com/julienschmidt/httprouter"
)

// CORS provides the middleware for setting CORS headers.
type CORS struct{}

// NewCORS instantiates a new CORS middleware to be used
// for api endpoint handlers.
func NewCORS() *CORS {
	return &CORS{}
}

func (c *CORS) ServeHTTP(w http.ResponseWriter, r *http.Request, ps httprouter.Params, next http.HandlerFunc) {
	utils.SetHeaders(w, true)
	next(w, r)
}
