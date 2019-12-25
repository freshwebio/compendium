package core

import (
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/secretsmanager"
	"github.com/freshwebio/apydox-api/pkg/utils"
	"github.com/namsral/flag"
)

func newSecretsManager(endpoint string) utils.SecretRetriever {
	// Override the sensitive credentials with values from secrets manager.
	var secretsMgr *secretsmanager.SecretsManager
	if endpoint != "" {
		secretsmgrConfig := &aws.Config{Endpoint: &endpoint}
		secretsMgr = secretsmanager.New(session.New(), secretsmgrConfig)
	} else {
		secretsMgr = secretsmanager.New(session.New())
	}
	return secretsMgr
}

// SetupServices provides the core services to the rest of
// the applications.
func SetupServices(services map[string]interface{}) (err error) {
	services["core.config"], err = LoadConfig(flag.NewFlagSet(os.Args[0], flag.ExitOnError), os.Args[1:], newSecretsManager)
	return
}
