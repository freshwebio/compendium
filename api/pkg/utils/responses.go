package utils

import (
	"encoding/json"

	"github.com/aws/aws-lambda-go/events"
)

// ServerErrorMessage provides the message to be used
// in producing HTTP responses for unexpected errors.
var ServerErrorMessage = "Unexpected server error"

// ServerError produces an unexpected server error.
// This is specific to the AWS API Gateway + Lambda function deployment approach.
func ServerError() events.APIGatewayProxyResponse {
	errorResponse, _ := json.Marshal(struct {
		Message string `json:"message"`
	}{Message: ServerErrorMessage})
	return events.APIGatewayProxyResponse{StatusCode: 500, Headers: SetHeaders(nil, false), Body: string(errorResponse)}
}

func prepareMessage(message string, fallbackMessage string) string {
	if message != "" {
		return message
	}
	return fallbackMessage
}

// BadRequestMessage provides a fallback message to be used
// in producing HTTP responses for bad request errors.
var BadRequestMessage = "Bad request, please make sure you provide the request parameters and payload in the correct format"

// BadRequestError produces a bad request error.
// This is specific to the AWS API Gateway + Lambda function environment.
func BadRequestError(message string) events.APIGatewayProxyResponse {
	finalMessage := prepareMessage(message, BadRequestMessage)
	errorResponse, _ := json.Marshal(struct {
		Message string `json:"message"`
	}{Message: finalMessage})
	return events.APIGatewayProxyResponse{StatusCode: 400, Headers: SetHeaders(nil, false), Body: string(errorResponse)}
}
