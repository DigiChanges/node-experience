#!/bin/bash

files=$(git diff --name-only --diff-filter=A --staged)

for file in $files; do
    if [[ "$file" == *"src/"* ]]; then
        (grep -qxF "$file" .files_to_compile.dat || echo "$file" >> .files_to_compile.dat) 2>/dev/null
    fi
done
