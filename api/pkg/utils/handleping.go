package utils

import (
	"encoding/json"

	"github.com/aws/aws-lambda-go/events"
)

// HandlePing provides functionality for imlementations of compendium
// in a serverless architecture to handle ping events on a timer
// that exist to keep serverless functions warm to reduce the request time.
//
// Currently this only works for implementations deployed to AWS lambda + API Gateway.
// A request body containing { "ping": true } indicates the request is a ping.
//
// The request is not a ping request if the returned value is nil.
func HandlePing(request events.APIGatewayProxyRequest) *events.APIGatewayProxyResponse {
	pingRequestBody := struct {
		Ping bool `json:"ping"`
	}{}
	err := json.Unmarshal([]byte(request.Body), &pingRequestBody)
	// In the case there is an error in unmarshalling or we read valid JSON without a ping value or with it set to false
	// than we can report it is not a ping request.
	if err != nil || !pingRequestBody.Ping {
		return nil
	}
	return &events.APIGatewayProxyResponse{StatusCode: 200, Headers: SetHeaders(nil, false), Body: "{}"}
}
