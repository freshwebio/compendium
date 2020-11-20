package serverless

import (
	"context"
	"log"

	"github.com/aws/aws-lambda-go/events"

	"github.com/freshwebio/compendium-api/pkg/bootstrap"
	"github.com/freshwebio/compendium-api/pkg/utils"
)

// RequestHandler provides a type alias for an AWS lambda RequestResponse event handler.
type RequestHandler func(context.Context, events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error)

// RequestHandlerFactory provides an alias for a function that
// takes a map of services and produces a RequestResponse event handler.
type RequestHandlerFactory func(map[string]interface{}) RequestHandler

// CreateBaseHandler deals with bootstrapping services and producing a request handler that takes care of
// ping requests and invokes the handler produced by the provided factory function otherwise.
func CreateBaseHandler(handlerCreator RequestHandlerFactory) RequestHandler {

	services, err := bootstrap.SetupServices()
	if err != nil {
		// If we can't bootsrap services then go no further, by returning a function that returns an error.
		log.Println(err)

		return func(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
			return events.APIGatewayProxyResponse{
				StatusCode: 500,
				Headers:    utils.SetHeaders(nil, false),
				Body:       "{\"message\":\"Unexpected error occurred\"}",
			}, nil
		}
	}

	handleRequest := handlerCreator(services)

	return func(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
		pingResponse := utils.HandlePing(request)
		if pingResponse != nil {
			return *pingResponse, nil
		}

		return handleRequest(ctx, request)
	}
}
