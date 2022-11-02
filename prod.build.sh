#!/usr/bin/env bash

pnpm
pnpm build
cp ./.env.prod ./.env
pm2-runtime start ecosystem.config.js
