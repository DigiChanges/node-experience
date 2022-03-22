#!/bin/bash

cp -r /home/node/cache/node_modules /home/node/app
yarn pre-build && yarn tsc && yarn dev:watch
