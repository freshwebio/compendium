package core

import (
	"github.com/aws/aws-sdk-go/aws"
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
	SecretSource         *string
	SecretSourceEndpoint *string
	SecretID             *string
	Test                 *bool
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

// Not ideal, but as flag (even the namsral derivative) doesn't let us define and extract flags more than once
// we need to store a local module copy of the config.
// (Especially needed for a set of tests in the same module that deal with bootstrapping the application)
var config *Config

// LoadConfig deals with loading up the configuration
// from property files, environment variables or command line options
// depending on what's available for each config value.
func LoadConfig() (*Config, error) {
	if config != nil {
		return config, nil
	}
	config = &Config{}
	if flag.Lookup(flag.DefaultConfigFlagname) == nil {
		flag.String(flag.DefaultConfigFlagname, "", "path to config file")
	}
	config.Env = loadEnvConfig()
	config.Github = loadGithubConfig()
	config.Server = loadServerConfig()
	flag.Parse()
	if *config.Env.SecretSource == "aws_secrets_manager" {
		// Override the sensitive credentials with values from secrets manager.
		var secretsMgr *secretsmanager.SecretsManager
		// Where a custom secrets source endpoint is provided, ensure we use that
		// in connecting to the secrets manager instance.
		// This is useful for local development environments especially.
		if *config.Env.SecretSourceEndpoint != "" {
			secretsmgrConfig := &aws.Config{Endpoint: config.Env.SecretSourceEndpoint}
			secretsMgr = secretsmanager.New(session.New(), secretsmgrConfig)
		} else {
			secretsMgr = secretsmanager.New(session.New())
		}

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
	var secretSource string
	var secretID string
	var test bool
	var secretSourceEndpoint string
	flag.StringVar(&secretSource, "apydox_api_secret_source", "", "The source for secrets used to connect with databases and third parties in the application")
	flag.StringVar(&secretID, "apydox_api_secret_id", "", "In the case the secret source is AWS Secrets Manager, this is the id for the set of secrets")
	flag.BoolVar(&test, "apydox_env_test", false, "Whether or not the current environment is for automated tests")
	flag.StringVar(&secretSourceEndpoint, "apydox_api_secret_source_endpoint", "", "The endpoint to connect to the secrets source, used for AWS Secrets Manager")
	return &EnvConfig{
		SecretSource:         &secretSource,
		SecretID:             &secretID,
		Test:                 &test,
		SecretSourceEndpoint: &secretSourceEndpoint,
	}
}

func loadGithubConfig() *GithubConfig {
	var clientID string
	var clientSecret string
	flag.StringVar(&clientID, "apydox_api_github_client_id", "", "The client oauth application id")
	flag.StringVar(&clientSecret, "apydox_api_github_client_secret", "", "The client oauth application secret")
	return &GithubConfig{
		ClientID:     &clientID,
		ClientSecret: &clientSecret,
	}
}

func loadServerConfig() *ServerConfig {
	var apiPort string
	var tls bool
	var tlsCert string
	var tlsKey string
	flag.StringVar(&apiPort, "apydox_api_port", "4305", "The port on which the API server should run")
	flag.BoolVar(&tls, "apydox_api_tls", false, "Whether or not TLS should be used to run the server")
	flag.StringVar(&tlsCert, "apydox_api_tls_cert", "__local_resources/server.crt", "The path of the file that contains the TLS certificate")
	flag.StringVar(&tlsKey, "apydox_api_tls_key", "__local_resources/server.key", "The path of the file that contains the TLS key")
	return &ServerConfig{
		APIPort: &apiPort,
		TLS:     &tls,
		TLSCert: &tlsCert,
		TLSKey:  &tlsKey,
	}
}
