package main

import (
	"github.com/freshwebio/apydox-api/pkg/auth"
	"github.com/julienschmidt/httprouter"
)

func registerRoutes(router *httprouter.Router, services map[string]interface{}) {
	auth.RegisterRoutes(router, services)
}
