package auth

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

// RegisterRoutes registers all the routes related to authorisation and authentication for
// the portal.
func RegisterRoutes(router *httprouter.Router, services map[string]interface{}) {
	ctrl := NewController(services["auth.auth"].(Service))
	router.POST("/auth/github/oauth/access-token", ctrl.GetGitHubAccessToken)
	router.OPTIONS("/auth/github/oauth/access-token", func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		w.WriteHeader(200)
		// w.Write([]byte(""))
	})

	router.GET("/auth/github/check", ctrl.CheckGitHubAccessToken)
	router.OPTIONS("/auth/github/check", func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		w.WriteHeader(200)
		// w.Write([]byte(""))
	})

	router.DELETE("/auth/github/revoke/:access_token", ctrl.RevokeGitHubAccessToken)
	router.OPTIONS("/auth/github/revoke/:access_token", func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		w.WriteHeader(200)
		// w.Write([]byte(""))
	})
}
