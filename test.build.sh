#!/usr/bin/env bash

export NODE_ENV=test

node dist/src/command.js addUserRole --role Admin --email user@node.com --firstName node --lastName node --password 12345678 --isSuperAdmin false
node dist/src/command.js addUserRole --role SuperAdmin --email superadmin@node.com --firstName super --lastName admin --password 12345678 --isSuperAdmin true

yarn start:test