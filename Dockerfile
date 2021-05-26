FROM keymetrics/pm2:15-stretch

WORKDIR /usr/app

# Bundle APP files
COPY src /usr/app
COPY package.json /usr/app
COPY ecosystem.config.js /usr/app

RUN apt update && apt install jq original-awk -y
RUN npm install --global yarn cross-env --force
RUN chown -R node:node /usr/app

ENV NPM_CONFIG_LOGLEVEL warn

USER node
