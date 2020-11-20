package bootstrap

import (
	"github.com/freshwebio/compendium-api/pkg/auth"
	"github.com/freshwebio/compendium-api/pkg/core"
)

// SetupServices deals with setting up the services provided by the modules
// that make up the portal api.
func SetupServices() (map[string]interface{}, error) {
	services := make(map[string]interface{})
	err := core.SetupServices(services)
	if err != nil {
		return nil, err
	}
	auth.SetupServices(services)
	return services, nil
}
