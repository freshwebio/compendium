#!/bin/sh

for d in cmd/handlers/*/; do
  dtrimmed=$(echo $d | sed -e "s/\///g")
  is_lambda_function=$(cat aws-sam-template.yaml | grep -i -E "CodeUri: (\'|\")?\.\/cmd/handlers/${dtrimmed}")
  if [ -n "$is_lambda_function" ]; then
    rm "cmd/handlers/${d}main"
  fi
done