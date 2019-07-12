package main

import (
	"context"
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

		token := request.PathParameters["access_token"]
		if token == "" {
			return events.APIGatewayProxyResponse{
				StatusCode: 400,
				Headers:    utils.SetHeaders(nil, false),
				Body:       "{\"message\":\"Please provide a valid access token\"}",
			}, nil
		}

		err := authService.RevokeAccessToken(token)
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

func startLambda() {
	lambda.Start(serverless.CreateBaseHandler(requestHandler))
}

func main() {
	startLambda()
}
