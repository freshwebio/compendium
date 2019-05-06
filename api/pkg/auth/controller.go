package auth

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

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
		w.WriteHeader(400)
		errorResponse, _ := json.Marshal(struct{ message string }{message: "Bad input"})
		w.Write(errorResponse)
		return
	}

	token, err := ctrl.authService.GetGitHubAccessToken(codeRequest.Code)
	if err != nil {
		w.WriteHeader(500)
		errorResponse, _ := json.Marshal(struct {
			Message string `json:"message"`
		}{Message: "Unexpected server error"})
		w.Write(errorResponse)
		return
	}

	fmt.Printf("token: %s\n", token)
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

	validToken, err := ctrl.authService.CheckGitHubAccessToken(token)
	if err != nil {
		log.Println(err)
		w.WriteHeader(500)
		errorResponse, _ := json.Marshal(struct {
			Message string `json:"message"`
		}{Message: "Unexpected server error"})
		w.Write(errorResponse)
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
		w.Write([]byte("{}"))
		return
	}

	err := ctrl.authService.RevokeAccessToken(token)
	if err != nil {
		log.Println(err)
		w.WriteHeader(500)
		errorResponse, _ := json.Marshal(struct {
			Message string `json:"message"`
		}{Message: "Unexpected server error"})
		w.Write(errorResponse)
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
