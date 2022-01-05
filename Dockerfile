FROM node:16-stretch

WORKDIR /usr/app

ENV NPM_CONFIG_LOGLEVEL warn

RUN npm install -g pm2 && yarn

# Bundle APP files
COPY . /usr/app

RUN chown -R node:node /usr/app

USER node
