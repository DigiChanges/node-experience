#!/usr/bin/env bash

files=$(git diff --name-only --diff-filter=D --staged)
filesRemove=""
space=" "

for file in $files; do
    if [[ "$file" == *"src/"* ]]; then
      fileToDelete=$(echo "$file" | sed -r 's/.ts+/.js/g')
      fileToDelete=$(echo "$fileToDelete" | sed -r 's/src+/dist/g')

      filesRemove=$fileToDelete$space$fileToDelete'.map'

      rm -rf $filesRemove
    fi
 done