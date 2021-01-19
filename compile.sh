#!/usr/bin/env bash

git add src/*

bash tools/newfile.sh
#bash tools/modifiedfile.sh
bash tools/deleted.sh

files=$(git diff --name-only --diff-filter=d --staged src/*)
EXTENDS="./tsconfig.json"
compile=""
space=" "

DIR="./dist"

# Check if exist dist folder
if [ "$(ls -A $DIR 2>/dev/null)" ]; then
     EXIST=0
     # If exist then transpile only new and modified files

     for file in $files; do
        if [[ "$file" == *"src/"* ]]; then
          compile=$file$space$compile
          EXIST=1
        fi
     done

    if [ $EXIST == 1 ]; then
      compile=${compile%?}

      VALUES=$(jq -Rnsc 'input | split(" ")' < <(printf '%s\0' "${compile[@]}"))
      (jq -nc '{extends: $ext, include: $val}' --arg ext "$EXTENDS" --argjson val "$VALUES" ) > extend.tsconfig.json
      yarn tsc --project extend.tsconfig.json
    fi
else
    yarn tsc
fi

yarn lint
yarn start
