#!/usr/bin/env bash

yarn pre-build
yarn tsc
pm2-runtime start ecosystem.config.js
