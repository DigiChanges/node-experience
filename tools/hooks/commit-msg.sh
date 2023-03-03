#!/bin/bash

PATTERN_COMMITS="((build|chore|ci|docs|feat|fix|perf|refactor|style|test).*\:|Merge|Revert|Apply).+"

msg=$(cat $HUSKY_GIT_PARAMS | sed '/^#.*/d')

if ! [[ $msg =~ ${PATTERN_COMMITS} ]]; then
  echo -e "\x1b[31mError commit message:\x1b[0m \x1b[33m"$msg"\x1b[0m does not follow conventional commit standard check \x1b[33mGit development workflow\x1b[33m in general README.md"
  exit 1;
fi
