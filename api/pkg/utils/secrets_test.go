package utils

import (
	"encoding/base64"
	"errors"
	"testing"

	"github.com/aws/aws-sdk-go/service/secretsmanager"
)

type mockSecretRetriever struct{}

func (s *mockSecretRetriever) GetSecretValue(secretInput *secretsmanager.GetSecretValueInput) (*secretsmanager.GetSecretValueOutput, error) {
	if *secretInput.SecretId == "validFromString" {
		validFromStr := "{\"APYDOX_API_GITHUB_CLIENT_ID\":\"testClientId\",\"APYDOX_API_GITHUB_CLIENT_SECRET\":\"testClientSecret\"}"
		return &secretsmanager.GetSecretValueOutput{
			SecretString: &validFromStr,
		}, nil
	} else if *secretInput.SecretId == "validFromBytes" {
		validFromBytes := []byte("{\"APYDOX_API_GITHUB_CLIENT_ID\":\"testClientId\",\"APYDOX_API_GITHUB_CLIENT_SECRET\":\"testClientSecret\"}")
		encodedBinarySecretBytes := make([]byte, base64.StdEncoding.EncodedLen(len(validFromBytes)))
		base64.StdEncoding.Encode(encodedBinarySecretBytes, validFromBytes)
		return &secretsmanager.GetSecretValueOutput{
			SecretBinary: encodedBinarySecretBytes,
		}, nil
	} else if *secretInput.SecretId == "networkOrAuthError" {
		return nil, errors.New("Failed to retrieve secret")
	} else if *secretInput.SecretId == "invalidJSON" {
		invalidJSON := "{\"APYDOX_API_GITHUB_CLIENT_ID\":\"testClientId\"\"APYDOX_API_GITHUB_CLIENT_SECRET\":\"testClientSecret\""
		return &secretsmanager.GetSecretValueOutput{
			SecretString: &invalidJSON,
		}, nil
	} else if *secretInput.SecretId == "invalidBase64" {
		invalidBase64 := []byte("{\"APYDOX_API_GITHUB_CLIENT_ID\":\"testClientId\",\"APYDOX_API_GITHUB_CLIENT_SECRET\":\"testClientSecret\"}")
		return &secretsmanager.GetSecretValueOutput{
			SecretBinary: invalidBase64,
		}, nil
	}
	return nil, nil
}

func TestGetSecretsValidFromString(t *testing.T) {
	secretsRetriever := &mockSecretRetriever{}
	secrets, err := GetSecrets("validFromString", secretsRetriever)
	if err != nil {
		t.Errorf("Expected error to be nil for retrieving a valid secret from a string but got %s", err)
	}
	if secrets.GithubClientID != "testClientId" {
		t.Errorf("Expected GithubClientID to be testClientId but received %s", secrets.GithubClientID)
	}
	if secrets.GithubClientSecret != "testClientSecret" {
		t.Errorf("Expected GithubClientID to be testClientSecret but received %s", secrets.GithubClientSecret)
	}
}

func TestGetSecretsValidFromBytes(t *testing.T) {
	secretsRetriever := &mockSecretRetriever{}
	secrets, err := GetSecrets("validFromBytes", secretsRetriever)
	if err != nil {
		t.Errorf("Expected error to be nil for retrieving a valid secret from a string but got %s", err)
	}
	if secrets.GithubClientID != "testClientId" {
		t.Errorf("Expected GithubClientID to be testClientId but received %s", secrets.GithubClientID)
	}
	if secrets.GithubClientSecret != "testClientSecret" {
		t.Errorf("Expected GithubClientID to be testClientSecret but received %s", secrets.GithubClientSecret)
	}
}

func TestGetSecretsNetworkOrAuthError(t *testing.T) {
	secretsRetriever := &mockSecretRetriever{}
	secrets, err := GetSecrets("networkOrAuthError", secretsRetriever)
	if err == nil {
		t.Errorf("Expected error to be defined for a network, auth or server error but received nil")
	}
	if secrets != nil {
		t.Errorf("Expected secrets to be nil for a network or auth error but received %+v", secrets)
	}
}

func TestGetSecretsInvalidJSON(t *testing.T) {
	secretsRetriever := &mockSecretRetriever{}
	secrets, err := GetSecrets("invalidJSON", secretsRetriever)
	if err == nil {
		t.Errorf("Expected error to be defined for attempting to retrieve invalid json but received nil")
	}
	if secrets != nil {
		t.Errorf("Expected secrets to be nil for invalid JSON but received %+v", secrets)
	}
}

func TestGetSecretsInvalidBase64(t *testing.T) {
	secretsRetriever := &mockSecretRetriever{}
	secrets, err := GetSecrets("invalidBase64", secretsRetriever)
	if err == nil {
		t.Errorf("Expected error to be defined for attempting to retrieve invalid json but received nil")
	}
	if secrets != nil {
		t.Errorf("Expected secrets to be nil for invalid JSON but received %+v", secrets)
	}
}
