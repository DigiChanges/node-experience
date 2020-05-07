#!/usr/bin/env bash

yarn
yarn build
npx ts-node src/command.ts addUserRole --role Admin --email user@node.com --firstName node --lastName node --password 12345678
cp ./.env.prod ./.env
pm2-runtime start ecosystem.config.js