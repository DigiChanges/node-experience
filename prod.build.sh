#!/usr/bin/env bash

yarn
yarn build
cp ./.env.prod ./.env
pm2-runtime start ecosystem.config.js