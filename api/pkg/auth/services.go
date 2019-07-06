package auth

import "github.com/freshwebio/apydox-api/pkg/core"

// SetupServices provides the auth services to the rest of
// the applications.
func SetupServices(services map[string]interface{}) {
	config := services["core.config"].(*core.Config)
	if *config.Env.Test {
		services["auth.auth"] = NewService(config, mockHTTPClient(), mockAuthorisationsClient())
	} else {
		services["auth.auth"] = NewDefaultService(services["core.config"].(*core.Config))
	}
}
