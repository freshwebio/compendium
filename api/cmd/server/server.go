package main

import (
	"net/http"

	"github.com/freshwebio/apydox-api/pkg/core"
	"github.com/freshwebio/entre"
)

func listenAndServe(e *entre.Entre, services map[string]interface{}) error {
	config := services["core.config"].(*core.Config)
	if *config.Server.TLS {
		return http.ListenAndServeTLS(":"+*config.Server.APIPort, *config.Server.TLSCert, *config.Server.TLSKey, e)
	}
	return http.ListenAndServe(":"+*config.Server.APIPort, e)
}
