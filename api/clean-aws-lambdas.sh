#!/bin/bash

for d in cmd/handlers/*/; do
  dtrimmed=$(echo $d | sed -e "s/cmd\/handlers\///g" | sed -e "s/\///g")
  is_lambda_function=$(grep -i -E "CodeUri: (\'|\")?\.\/cmd/handlers/${dtrimmed}" aws-sam-template.yaml)
  if [ -n "$is_lambda_function" ] && [ -f "cmd/handlers/${dtrimmed}/main" ]; then
    rm "cmd/handlers/${dtrimmed}/main"
  fi
done