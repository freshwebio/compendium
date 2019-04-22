package auth

import "github.com/freshwebio/apydox-api/pkg/core"

// SetupServices provides the auth services to the rest of
// the applications.
func SetupServices(services map[string]interface{}) {
	services["auth.auth"] = NewService(services["core.config"].(*core.Config))
}
