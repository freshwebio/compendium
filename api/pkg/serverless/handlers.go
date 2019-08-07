package serverless

import (
	"context"
	"encoding/json"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/freshwebio/apydox-api/pkg/auth"
	"github.com/freshwebio/apydox-api/pkg/utils"
)

// CheckAccessTokenRequestHandler produces a request handler to be used
// to check a provided access token in github for the configured Github OAuth app.
func CheckAccessTokenRequestHandler(services map[string]interface{}) RequestHandler {
	return func(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
		authService := services["auth.auth"].(auth.Service)
		token := request.QueryStringParameters["token"]
		if token == "" {
			errorResponse, _ := json.Marshal(struct {
				ValidToken bool `json:"validToken"`
			}{ValidToken: false})
			return events.APIGatewayProxyResponse{
				StatusCode: 401,
				Headers:    utils.SetHeaders(nil, false),
				Body:       string(errorResponse),
			}, nil
		}

		validToken, err := authService.CheckGitHubAccessToken(utils.SanitiseWord(token))
		if err != nil {
			log.Println(err)
			return utils.ServerError(), nil
		}

		responseData, _ := json.Marshal(struct {
			ValidToken bool `json:"validToken"`
		}{ValidToken: validToken})
		statusCode := 200
		if !validToken {
			statusCode = 401
		}
		return events.APIGatewayProxyResponse{
			StatusCode: statusCode,
			Headers:    utils.SetHeaders(nil, false),
			Body:       string(responseData),
		}, nil
	}
}

// RevokeAccessTokenRequestHandler produces a request handler to be used
// to revoke access from a provided token in github for the configured Github OAuth app.
func RevokeAccessTokenRequestHandler(services map[string]interface{}) RequestHandler {
	return func(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
		authService := services["auth.auth"].(auth.Service)

		token := request.PathParameters["access_token"]
		if token == "" {
			return events.APIGatewayProxyResponse{
				StatusCode: 400,
				Headers:    utils.SetHeaders(nil, false),
				Body:       "{\"message\":\"Please provide a valid access token\"}",
			}, nil
		}

		err := authService.RevokeAccessToken(utils.SanitiseWord(token))
		if err != nil {
			log.Println(err)
			return utils.ServerError(), nil
		}

		statusCode := 200
		return events.APIGatewayProxyResponse{
			StatusCode: statusCode,
			Headers:    utils.SetHeaders(nil, false),
			Body:       "{}",
		}, nil
	}
}

// RetrieveAccessTokenRequestHandler produces a request handler to be used
// to retrieve an access token as part of the OAuth flow for the configured Github OAuth app.
func RetrieveAccessTokenRequestHandler(services map[string]interface{}) RequestHandler {
	return func(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
		authService := services["auth.auth"].(auth.Service)

		codeRequest := &struct {
			Code string `json:"code"`
		}{}
		err := json.Unmarshal([]byte(request.Body), &codeRequest)
		if err != nil {
			return events.APIGatewayProxyResponse{
				StatusCode: 400,
				Headers:    utils.SetHeaders(nil, false),
				Body:       "{\"message\":\"Bad input\"}",
			}, nil
		}

		token, err := authService.GetGitHubAccessToken(utils.SanitiseWord(codeRequest.Code))
		if err != nil {
			log.Println(err)
			return utils.ServerError(), nil
		}

		responseData, _ := json.Marshal(struct {
			Token string `json:"token"`
		}{Token: token})
		statusCode := 200
		return events.APIGatewayProxyResponse{
			StatusCode: statusCode,
			Headers:    utils.SetHeaders(nil, false),
			Body:       string(responseData),
		}, nil
	}
}
