#!/usr/bin/env bash

cp ./.env.dev ./.env
npx ts-node src/command.ts addUserRole --role Admin --email user@node.com --firstName node --lastName node --password 12345678
yarn dev