#!/bin/bash

parameters_json="$(<sam-deploy-params.json)"
# Allow only new line separators as the internal field separator for new lines.
IFS=$'\n'

echo "Deploying the api"

sam deploy --stack-name ${STACK_NAME} --template-file ${PACKAGED_TEMPLATE} \
  --parameter-overrides \
  $(echo $parameters_json | jq -r 'to_entries|map("\(.key)=\(.value|tostring)")|.[]') \
  --capabilities CAPABILITY_IAM