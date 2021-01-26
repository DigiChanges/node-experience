#!/bin/bash

files=$(cat .files_to_compile.dat)
EXTENDS="./tsconfig.json"
compile=""
space=" "

DIR="./dist"

# Check if exist dist folder
if [ ! -d "$DIR" ]; then
  yarn tsc
else
   EXIST=0
   # If exist then transpile only new and modified files

   for file in $files; do
        compile=$file$space$compile
        EXIST=1
   done

  if [ $EXIST == 1 ]; then
    compile=$compile"src/compile.ts"

    VALUES=$(jq -Rnsc 'input | split(" ")' < <(printf '%s\0' "${compile[@]}"))
    (jq -nc '{extends: $ext, include: $val}' --arg ext "$EXTENDS" --argjson val "$VALUES" ) > extend.tsconfig.json
    yarn tsc --project extend.tsconfig.json
  fi
fi
