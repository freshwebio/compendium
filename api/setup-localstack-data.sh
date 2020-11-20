#!/bin/bash

echo "
Saving secrets to LocalStack secrets manager
"

aws --region eu-west-2 --endpoint-url=http://localhost:4584 secretsmanager create-secret --name COMPENDIUM/API-SECRETS --secret-string file://secrets.json