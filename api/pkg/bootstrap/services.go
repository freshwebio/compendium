package bootstrap

import (
	"github.com/freshwebio/apydox-api/pkg/auth"
	"github.com/freshwebio/apydox-api/pkg/core"
)

func SetupServices() (map[string]interface{}, error) {
	services := make(map[string]interface{})
	err := core.SetupServices(services)
	if err != nil {
		return nil, err
	}
	auth.SetupServices(services)
	return services, nil
}
