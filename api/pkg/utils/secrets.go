package utils

import (
	"encoding/base64"
	"encoding/json"
	"fmt"

	"github.com/aws/aws-sdk-go/service/secretsmanager"
)

// ApyDoxSecrets provides a structure
// for a set of secrets specific to the apydox api.
type ApyDoxSecrets struct {
	GithubClientID     string `json:"APYDOX_API_GITHUB_CLIENT_ID"`
	GithubClientSecret string `json:"APYDOX_API_GITHUB_CLIENT_SECRET"`
}

// SecretRetriever provides a base definition
// of a service that retrieves a secret from AWS secret store.
type SecretRetriever interface {
	GetSecretValue(secretInput *secretsmanager.GetSecretValueInput) (*secretsmanager.GetSecretValueOutput, error)
}

// GetSecrets retrieves a secret from AWS secrets manager and extracts
// all the secrets from the secret string or binary making use of a provided
// secret retrieval service.
func GetSecrets(secretID string, secretsRetriever SecretRetriever) (*ApyDoxSecrets, error) {
	secretInput := &secretsmanager.GetSecretValueInput{
		SecretId: &secretID,
	}
	result, err := secretsRetriever.GetSecretValue(secretInput)
	if err != nil {
		return nil, err
	}

	var secretString, decodedBinarySecret string
	if result.SecretString != nil {
		secretString = *result.SecretString
	} else {
		decodedBinarySecretBytes := make([]byte, base64.StdEncoding.DecodedLen(len(result.SecretBinary)))
		len, err := base64.StdEncoding.Decode(decodedBinarySecretBytes, result.SecretBinary)
		if err != nil {
			return nil, fmt.Errorf("Base64 Decode Error: %s", err.Error())
		}
		decodedBinarySecret = string(decodedBinarySecretBytes[:len])
	}

	var secrets = &ApyDoxSecrets{}
	if secretString != "" {
		err = json.Unmarshal([]byte(secretString), secrets)
		if err != nil {
			return nil, err
		}
	} else {
		err = json.Unmarshal([]byte(decodedBinarySecret), secrets)
		if err != nil {
			return nil, err
		}
	}

	return secrets, nil
}
