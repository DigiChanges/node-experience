FROM node:18-alpine as dev

RUN apk add bash dumb-init curl python3
RUN curl -s https://raw.githubusercontent.com/Intervox/node-webp/latest/bin/install_webp | bash
RUN apk add --no-cache --update libwebp-tools
RUN apk add --no-cache --update libpng-dev libjpeg-turbo-dev giflib-dev tiff-dev autoconf automake make gcc g++ wget
RUN wget --no-check-certificate https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.0.0.tar.gz && \
      tar -xvzf libwebp-1.0.0.tar.gz && \
      cd libwebp-1.0.0 && \
      ./configure && \
      make && \
      make install && \
      cd .. && \
      rm -rf libwebp-1.0.0 libwebp-1.0.0.tar.gz

RUN npm install --location=global pnpm

WORKDIR /usr/app

COPY --chown=node:node src ./src
COPY --chown=node:node tools ./tools
COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node ecosystem.config.js ./
COPY --chown=node:node .env ./
COPY --chown=node:node config ./config/
COPY --chown=node:node nodemon.json ./
COPY --chown=node:node .eslintrc.json ./
COPY --chown=node:node rimraf_cpy.mjs ./
COPY --chown=node:node .husky ./
COPY --chown=node:node .huskyrc ./
COPY --chown=node:node .npmrc ./

RUN pnpm install

RUN mkdir dist
RUN chown node:node dist

# Run development server
ENTRYPOINT [ "dumb-init", "pnpm", "dev" ]

USER node

FROM dev as build

USER root

RUN npm install --location=global pnpm

RUN pnpm install
RUN chown node:node node_modules

USER node

RUN pnpm build

FROM build as prerelease

WORKDIR /usr/app

USER root

RUN rm -rf node_modules
RUN pnpm install --production --ignore-scripts
RUN chown node:node node_modules

RUN cd node_modules/bcrypt && npm rebuild bcrypt --build-from-source

FROM node:18-alpine as prod

ENV NODE_ENV production

RUN apk add bash dumb-init
RUN npm install --location=global pm2 pnpm

WORKDIR /usr/app

# Copy js files and change ownership to user node
COPY --chown=node:node package.json pnpm-lock.yaml ecosystem.config.js ./
COPY --from=prerelease --chown=node:node /usr/app/node_modules/ ./node_modules/
COPY --from=prerelease --chown=node:node /usr/app/dist/ ./dist/
COPY --from=prerelease --chown=node:node /usr/app/config/ ./config/
COPY --from=prerelease --chown=node:node /usr/app/.env/ ./.env
COPY --from=prerelease --chown=node:node /usr/app/package.json/ ./package.json

USER node

#ENTRYPOINT ["dumb-init", "pm2-runtime", "start", "ecosystem.config.js"]
ENTRYPOINT ["dumb-init", "pnpm", "start"]
