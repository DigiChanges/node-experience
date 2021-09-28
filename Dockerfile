FROM node:16-stretch

WORKDIR /usr/app

# Bundle APP files
COPY src /usr/app
COPY package.json /usr/app
COPY ecosystem.config.js /usr/app

RUN npm install -g pm2
RUN chown -R node:node /usr/app

ENV NPM_CONFIG_LOGLEVEL warn

USER node
