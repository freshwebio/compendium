#!/bin/bash

parameters_json="$(<sam-deploy-params.json)"
parameter_overrides=""
# Allow only new line separators as the internal field separator for new lines.
IFS=$'\n'
for param in $(echo $parameters_json | jq -r "to_entries|map(\"ParameterKey=\(.key),ParameterValue=\(.value|tostring)\")|.[]" ); do
  if [ -n "$parameter_overrides" ]; then
    parameter_overrides="$parameter_overrides $param"
  else
    parameter_overrides="$param"
  fi
done

if "sam deploy --stack-name ${STACK_NAME} --template-file ${PACKAGED_TEMPLATE} --parameter-overrides \"${parameter_overrides}\" --capabilities CAPABILITY_IAM"; then
  printf "\e[32mSuccessfully deployed SAM application, see above for details\n \e[39m"
else
  printf "\e[31mFailed to deploy SAM application, see above for details\n \e[39m"
fi