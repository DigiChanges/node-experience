#!/usr/bin/env bash

yarn
cp ./.env.dev ./.env
npx ts-node src/command.ts addUserRole --role Admin --email user@node.com --firstName node --lastName node --password 12345678 --isSuperAdmin false
npx ts-node src/command.ts addUserRole --role SuperAdmin --email superadmin@node.com --firstName super --lastName admin --password 12345678 --isSuperAdmin true
yarn dev