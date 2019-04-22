package core

// SetupServices provides the core services to the rest of
// the applications.
func SetupServices(services map[string]interface{}) (err error) {
	services["core.config"], err = LoadConfig()
	return
}
