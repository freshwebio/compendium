package core

import (
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/secretsmanager"
	"github.com/namsral/flag"

	"github.com/freshwebio/apydox-api/pkg/utils"
)

// Config provides the definition for configuration
// used within the application.
type Config struct {
	Github *GithubConfig
	Server *ServerConfig
	Env    *EnvConfig
}

// EnvConfig provides environment-specific configuration around the source
// of secrets for the API.
type EnvConfig struct {
	SecretSource *string
	SecretID     *string
}

// GithubConfig provides the secrets for connecting to a github application
// that works as a back-end for managing and storing the API definitions for the portal.
type GithubConfig struct {
	ClientID     *string
	ClientSecret *string
}

// ServerConfig provides configuration that is used when serving the API as a http server.
type ServerConfig struct {
	APIPort *string
	TLS     *bool
	TLSCert *string
	TLSKey  *string
}

// LoadConfig deals with loading up the configuration
// from property files, environment variables or command line options
// depending on what's available for each config value.
func LoadConfig() (*Config, error) {
	config := &Config{}
	flag.String(flag.DefaultConfigFlagname, "", "path to config file")
	config.Env = loadEnvConfig()
	config.Github = loadGithubConfig()
	config.Server = loadServerConfig()
	flag.Parse()
	if *config.Env.SecretSource == "aws_secrets_manager" {
		// Override the sensitive credentials with values from secrets manager.
		secretsMgr := secretsmanager.New(session.New())
		secrets, err := utils.GetSecrets(*config.Env.SecretID, secretsMgr)
		if err != nil {
			return nil, err
		}
		// Populate the sensitive configuration with the secrets from secrets manager.
		populateSecrets(secrets, config)
	}
	return config, nil
}

func populateSecrets(secrets *utils.ApyDoxSecrets, config *Config) {
	config.Github.ClientID = &secrets.GithubClientID
	config.Github.ClientSecret = &secrets.GithubClientSecret
}

func loadEnvConfig() *EnvConfig {
	config := &EnvConfig{}
	config.SecretSource = flag.String("apydox_api_secret_source", "", "The source for secrets used to connect with databases and third parties in the application")
	config.SecretID = flag.String("apydox_api_secret_id", "", "In the case the secret source is AWS Secrets Manager, this is the id for the set of secrets")
	return config
}

func loadGithubConfig() *GithubConfig {
	config := &GithubConfig{}
	config.ClientID = flag.String("apydox_api_github_client_id", "", "The client oauth application id")
	config.ClientSecret = flag.String("apydox_api_github_client_secret", "", "The client oauth application secret")
	return config
}

func loadServerConfig() *ServerConfig {
	config := &ServerConfig{}
	config.APIPort = flag.String("apydox_api_port", "4305", "The port on which the API server should run")
	config.TLS = flag.Bool("apydox_api_tls", false, "Whether or not TLS should be used to run the server")
	config.TLSCert = flag.String("apydox_api_tls_cert", "__local_resources/server.crt", "The path of the file that contains the TLS certificate")
	config.TLSKey = flag.String("apydox_api_tls_key", "__local_resources/server.key", "The path of the file that contains the TLS key")
	return config
}
