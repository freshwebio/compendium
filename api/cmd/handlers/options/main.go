package main

import (
	"context"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"

	"github.com/freshwebio/compendium-api/pkg/utils"
)

// Simply returns a 200 response for options requests for local environments running SAM local.
func requestHandler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    utils.SetHeaders(nil, false),
		Body:       "",
	}, nil
}

func startLambda() {
	lambda.Start(requestHandler)
}

func main() {
	startLambda()
}
