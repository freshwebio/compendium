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

		token, err := authService.GetGitHubAccessToken(codeRequest.Code)
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

func startLambda() {
	lambda.Start(serverless.CreateBaseHandler(requestHandler))
}

func main() {
	startLambda()
}
