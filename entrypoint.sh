#!/bin/bash
echo "Init entrypoint ..."
SECONDS=0;
cp -r /home/node/cache/node_modules /home/node/app
echo "done in $SECONDS s."
echo "Running entrypoint yarn script..."
yarn pre-build && yarn dev:watch
