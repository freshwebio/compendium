#!/bin/bash

for d in cmd/handlers/*/; do
  dtrimmed=$(echo $d | sed -e "s/cmd\/handlers\///g" | sed -e "s/\///g")
  is_lambda_function=$(grep -i -E "CodeUri: (\'|\")?\.\/cmd/handlers/${dtrimmed}" aws-sam-template.yaml)
  if [ -n "$is_lambda_function" ]; then
    PREV_WORKING_DIR=$(pwd)
    cd "cmd/handlers/$dtrimmed"
    GOOS=linux GOARCH=amd64 go build -o main
    cd $PREV_WORKING_DIR
  fi
done