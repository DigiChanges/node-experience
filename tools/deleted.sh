#!/usr/bin/env bash

filesRemove=$(git diff --name-only --diff-filter=D --staged)

for file in $filesRemove; do
    if [[ "$file" == *"src/"* ]]; then
      fileToDelete=$(echo "$file" | sed -r 's/.ts+/.js/g')
      echo "$fileToDelete"
#      echo "$file"
#      compile=$file$space$compile
#      EXIST=1
    fi
 done