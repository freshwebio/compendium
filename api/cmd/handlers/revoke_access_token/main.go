package main

import (
	"github.com/aws/aws-lambda-go/lambda"

	"github.com/freshwebio/apydox-api/pkg/serverless"
)

func startLambda() {
	lambda.Start(serverless.CreateBaseHandler(serverless.RevokeAccessTokenRequestHandler))
}

func main() {
	startLambda()
}
