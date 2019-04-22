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
	return events.APIGatewayProxyResponse{StatusCode: 500, Headers: SetHeaders(nil), Body: string(errorResponse)}
}
