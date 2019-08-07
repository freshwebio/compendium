package auth

import (
	"encoding/json"
	"net/http"

	"github.com/freshwebio/apydox-api/pkg/core"
	"github.com/freshwebio/apydox-api/pkg/utils"
	"github.com/julienschmidt/httprouter"
)

// Controller provides the set of http handlers that interact with github
// for authorisation purposes.
type Controller interface {
	GetGitHubAccessToken(http.ResponseWriter, *http.Request, httprouter.Params)
	CheckGitHubAccessToken(http.ResponseWriter, *http.Request, httprouter.Params)
	RevokeGitHubAccessToken(http.ResponseWriter, *http.Request, httprouter.Params)
}

type controllerImpl struct {
	authService Service
}

func (ctrl *controllerImpl) GetGitHubAccessToken(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	codeRequest := &struct {
		Code string `json:"code"`
	}{}
	err := json.NewDecoder(r.Body).Decode(&codeRequest)
	if err != nil {
		core.HTTPError(w, 400, "Please provide a valid code in a JSON object")
		return
	}

	if codeRequest.Code == "" {
		core.HTTPError(w, 400, "Please provide a valid code in a JSON object")
		return
	}

	token, err := ctrl.authService.GetGitHubAccessToken(utils.SanitiseWord(codeRequest.Code))
	if err != nil {
		core.HTTPError(w, 500, "Unexpected server error")
		return
	}

	responseData, _ := json.Marshal(struct {
		Token string `json:"token"`
	}{Token: token})
	w.WriteHeader(200)
	w.Write(responseData)
}

func (ctrl *controllerImpl) CheckGitHubAccessToken(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	token := r.URL.Query().Get("token")
	if token == "" {
		w.WriteHeader(401)
		errorResponse, _ := json.Marshal(struct {
			ValidToken bool `json:"validToken"`
		}{ValidToken: false})
		w.Write(errorResponse)
		return
	}

	validToken, err := ctrl.authService.CheckGitHubAccessToken(utils.SanitiseWord(token))
	if err != nil {
		core.HTTPError(w, 500, "Unexpected server error")
		return
	}

	responseData, _ := json.Marshal(struct {
		ValidToken bool `json:"validToken"`
	}{ValidToken: validToken})
	statusCode := 200
	if !validToken {
		statusCode = 401
	}
	w.WriteHeader(statusCode)
	w.Write(responseData)
}

func (ctrl *controllerImpl) RevokeGitHubAccessToken(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	token := ps.ByName("access_token")
	if token == "" {
		w.WriteHeader(400)
		w.Write([]byte("{\"message\":\"Please provide a valid access token\"}"))
		return
	}

	err := ctrl.authService.RevokeAccessToken(utils.SanitiseWord(token))
	if err != nil {
		core.HTTPError(w, 500, "Unexpected server error")
		return
	}
	w.WriteHeader(200)
	w.Write([]byte("{}"))
}

// NewController creates a new instance of the auth controller
// used to provide the endpoint handlers for the authorisation and authentication
// parts of the portal.
func NewController(authService Service) Controller {
	return &controllerImpl{authService}
}
