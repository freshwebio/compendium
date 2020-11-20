package core

import (
	"os"
	"testing"

	"github.com/aws/aws-sdk-go/service/secretsmanager"
	"github.com/freshwebio/compendium-api/pkg/utils"
	"github.com/namsral/flag"
)

func Test_config_loads_correctly_from_config_file(t *testing.T) {
	conf, err := LoadConfig(flag.NewFlagSet("compendium-api", flag.ContinueOnError), []string{
		"-config", "__test_resources/compendium-api.test.conf",
	}, nil)
	if err != nil {
		t.Errorf("Failed to load configuration due to %v", err)
	}

	expectedClientID := "af10e00"
	if *conf.Github.ClientID != expectedClientID {
		t.Errorf("Expected %s but received %s", expectedClientID, *conf.Github.ClientID)
	}

	expectedClientSecret := "di3fuasd831sdaf398f"
	if *conf.Github.ClientSecret != expectedClientSecret {
		t.Errorf("Expected %s but received %s", expectedClientSecret, *conf.Github.ClientSecret)
	}

	expectedPort := "43029"
	if *conf.Server.APIPort != expectedPort {
		t.Errorf("Expected %s but received %s", expectedPort, *conf.Server.APIPort)
	}

	expectedTLS := true
	if *conf.Server.TLS != expectedTLS {
		t.Errorf("Expected %v but received %v", expectedTLS, *conf.Server.TLS)
	}

	expectedEnvTest := false
	if *conf.Env.Test != expectedEnvTest {
		t.Errorf("Expected %v but received %v", expectedEnvTest, *conf.Env.Test)
	}
}

type testSecretsMgr struct{}

func (s *testSecretsMgr) GetSecretValue(secretInput *secretsmanager.GetSecretValueInput) (*secretsmanager.GetSecretValueOutput, error) {
	secretString := "{\"COMPENDIUM_API_GITHUB_CLIENT_ID\":\"a1f3uda1\",\"COMPENDIUM_API_GITHUB_CLIENT_SECRET\":\"39sdf8fj2dasdu3ydasdasd\"}"
	return &secretsmanager.GetSecretValueOutput{
		SecretString: &secretString,
	}, nil
}

func testCreateSecretsMgr(endpoint string) utils.SecretRetriever {
	return &testSecretsMgr{}
}

func Test_config_loads_correctly_from_secrets_mgr(t *testing.T) {
	os.Setenv("COMPENDIUM_API_SECRET_ID", "COMPENDIUM-API-SECRETS")
	os.Setenv("COMPENDIUM_ENV_TEST", "true")
	os.Setenv("COMPENDIUM_API_SECRET_SOURCE", "aws_secrets_manager")
	conf, err := LoadConfig(flag.NewFlagSet("compendium-api", flag.ContinueOnError), []string{}, testCreateSecretsMgr)
	if err != nil {
		t.Errorf("Failed to load configuration due to %v", err)
	}

	expectedEnvTest := true
	if *conf.Env.Test != expectedEnvTest {
		t.Errorf("Expected %v but received %v", expectedEnvTest, *conf.Env.Test)
	}

	expectedGithubClientID := "a1f3uda1"
	if *conf.Github.ClientID != expectedGithubClientID {
		t.Errorf("Expected %v but received %v", expectedGithubClientID, *conf.Github.ClientID)
	}

	expectedGithubClientSecrets := "39sdf8fj2dasdu3ydasdasd"
	if *conf.Github.ClientSecret != expectedGithubClientSecrets {
		t.Errorf("Expected %v but received %v", expectedGithubClientSecrets, *conf.Github.ClientSecret)
	}
}
