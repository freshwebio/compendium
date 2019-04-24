package main

import (
	"log"

	"github.com/julienschmidt/httprouter"

	"github.com/freshwebio/apydox-api/pkg/bootstrap"
	"github.com/freshwebio/apydox-api/pkg/middleware"
	"github.com/freshwebio/entre"
)

func main() {
	router := httprouter.New()
	services, err := bootstrap.SetupServices()
	if err != nil {
		log.Fatal("bootstrap: SetupServices: ", err)
	}
	registerRoutes(router, services)

	e := entre.Basic()
	e.Push(middleware.NewCORS())
	e.Push(middleware.NewContentType("application/json"))
	e.PushHandler(router)
	err = listenAndServe(e, services)
	if err != nil {
		log.Fatal("listenAndServe: ", err)
	}
}
