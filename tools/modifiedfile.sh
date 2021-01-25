#!/bin/bash

files=$(git diff --name-only --diff-filter=M --staged src/*)

for file in $files; do
    if [[ "$file" == *"src/"* ]]; then
        (grep -qxF "$file" .modifiedfiles.dat || echo "$file" >> .modifiedfiles.dat) 2>/dev/null
    fi
done
