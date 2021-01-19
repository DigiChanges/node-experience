#!/usr/bin/env bash

files=$(git diff --name-only --diff-filter=d)
EXTENDS="./tsconfig.json"
compile=""
space=" "

DIR="./dist"

# Check if exist dist folder
if [ "$(ls -A $DIR)" ]; then
     EXIST=0
     # If exist then transpile only new and modified files

     for file in $files; do
        if [[ "$file" == *"src/"* ]]; then
          compile=$file$space$compile
          EXIST=1
        fi
     done

    if [ $EXIST == 1 ]; then
        compile=${compile%??}

        # shellcheck disable=SC2068
        (jq -nc '{extends: $ext, include: $ARGS.positional}' --args ${compile[@]} --arg ext "$EXTENDS" ) > extend.tsconfig.json

        yarn tsc --project extend.tsconfig.json
    fi
else
    yarn tsc --project tsconfig.json
fi

yarn lint
yarn start
