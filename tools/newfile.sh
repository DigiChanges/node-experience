#!/usr/bin/env bash

files=$(git diff --name-only --diff-filter=A --staged)

for file in $files; do
    if [[ "$file" == *"src/"* ]]; then
        (grep -qxF "$file" .newfiles.dat || echo "$file" >> .newfiles.dat) 2>/dev/null
    fi
done
