#!/bin/sh

for d in cmd/handlers/*/; do
  dtrimmed=$(echo $d | sed -e "s/\///g")
  is_lambda_function=$(cat aws-sam-template.yaml | grep -i -E "CodeUri: (\'|\")?\.\/cmd/handlers/${dtrimmed}")
  if [ -n "$is_lambda_function" ]; then
    PREV_WORKING_DIR=$(pwd)
    cd "cmd/handlers/$d"
    GOOS=linux GOARCH=amd64 go build -o main
    cd $PREV_WORKING_DIR
  fi
done