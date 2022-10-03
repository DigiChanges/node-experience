FROM node:16-alpine as dev

RUN apk add bash dumb-init curl
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

WORKDIR /usr/app

RUN npm install --location=global pnpm

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node src ./src
COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node ecosystem.config.js ./
COPY --chown=node:node .env ./
COPY --chown=node:node config ./config/
COPY --chown=node:node build.js ./
COPY --chown=node:node nodemon.json ./
COPY --chown=node:node .eslintrc.json ./

# Run development server
ENTRYPOINT [ "dumb-init", "pnpm", "dev" ]

EXPOSE 8089
EXPOSE 9229

USER node

FROM dev as build

RUN pnpm install
RUN pnpm transpile

FROM build as prerelease

RUN pnpm install --production

FROM node:16-alpine as prod

RUN apk add bash dumb-init
RUN npm install -g pm2

WORKDIR /usr/app

COPY --from=prerelease --chown=node:node /usr/app/package.json ./
COPY --from=prerelease --chown=node:node /usr/app/ecosystem.config.js/ ./
COPY --from=prerelease --chown=node:node /usr/app/node_modules/ ./node_modules/
COPY --from=prerelease --chown=node:node /usr/app/dist/ ./dist/
COPY --from=prerelease --chown=node:node /usr/app/config/ ./config/
COPY --from=prerelease --chown=node:node /usr/app/.env/ ./.env
COPY --from=dev --chown=node:node /usr/app/src/Config/Locales ./dist/src/Config/Locales
COPY --from=dev --chown=node:node /usr/app/src/App/Presentation/Views ./dist/src/App/Presentation/Views

USER node

ENTRYPOINT ["dumb-init", "pm2-runtime", "start", "ecosystem.config.js"]
