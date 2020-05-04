FROM keymetrics/pm2:12-stretch

WORKDIR /usr/app

# Bundle APP files
COPY src /usr/app
COPY package.json /usr/app
COPY ecosystem.config.js /usr/app

RUN npm install --global yarn cross-env --force
RUN chown -R node:node /usr/app

ENV NPM_CONFIG_LOGLEVEL warn

USER node

RUN yarn
