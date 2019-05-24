
package serverless

import (
	"context"

	"github.com/aws/aws-lambda-go/events"

	"github.com/freshwebio/apydox-api/pkg/utils"
	"github.com/freshwebio/apydox-api/pkg/bootstrap"
)

// RequestHandler provides a type alias for an AWS lambda RequestResponse event handler.
type RequestHandler func (context.Context, events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error)

// RequestHandlerFactory provides an alias for a function that 
// takes a map of services and produces a RequestResponse event handler.
type RequestHandlerFactory func (map[string]interface{}) RequestHandler

// CreateBaseHandler deals with bootstrapping services and producing a request handler that takes care of
// ping requests and invokes the handler produced by the provided factory function otherwise.
func CreateBaseHandler(handlerCreator RequestHandlerFactory) RequestHandler {

	services, err := bootstrap.SetupServices()
	if err != nil {
		// If we can't bootsrap services then go no further.
		panic(err)
	}

	handleRequest := handlerCreator(services)

	return func (ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
		pingResponse := utils.HandlePing(request)
		if pingResponse != nil {
			return *pingResponse, nil
		}
	
		return handleRequest(ctx, request)
	}
}