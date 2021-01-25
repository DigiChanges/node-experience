#!/bin/bash

files=$(git diff --name-only --diff-filter=M --staged src)

for file in $files; do
  (grep -qxF "$file" .files_modified.dat || echo "$file" >> .files_modified.dat) 2>/dev/null
  (grep -qxF "$file" .files_to_compile.dat || echo "$file" >> .files_to_compile.dat) 2>/dev/null
done
