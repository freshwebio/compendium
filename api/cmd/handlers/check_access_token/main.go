package main

import (
	"context"
	"encoding/json"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"

	"github.com/freshwebio/apydox-api/pkg/auth"
	"github.com/freshwebio/apydox-api/pkg/serverless"
	"github.com/freshwebio/apydox-api/pkg/utils"
)

func requestHandler(services map[string]interface{}) serverless.RequestHandler {
	return func(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
		authService := services["auth.auth"].(auth.Service)
		token := request.QueryStringParameters["token"]
		if token == "" {
			errorResponse, _ := json.Marshal(struct {
				ValidToken bool `json:"validToken"`
			}{ValidToken: false})
			return events.APIGatewayProxyResponse{StatusCode: 401, Headers: utils.SetHeaders(nil, false), Body: string(errorResponse)}, nil
		}
		validToken, err := authService.CheckGitHubAccessToken(token)
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
		return events.APIGatewayProxyResponse{StatusCode: statusCode, Headers: utils.SetHeaders(nil, false), Body: string(responseData)}, nil
	}
}

func startLambda() {
	lambda.Start(serverless.CreateBaseHandler(requestHandler))
}

func main() {
	startLambda()
}
