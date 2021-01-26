#!/bin/bash

files=$(git diff --name-only --diff-filter=ADM --staged src)

if [ -z "$files" ]; then
  rm -rf .files_deleted.dat
  rm -rf .files_modified.dat
  rm -rf .files_to_compile.dat
  rm -rf extendtsconfig.json
fi
