package main

import (
	"github.com/freshwebio/compendium-api/pkg/auth"
	"github.com/julienschmidt/httprouter"
)

func registerRoutes(router *httprouter.Router, services map[string]interface{}) {
	auth.RegisterRoutes(router, services)
}
