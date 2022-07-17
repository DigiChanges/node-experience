FROM node:16-alpine as dev

RUN apk add bash dumb-init

WORKDIR /usr/app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node src ./src
COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node ecosystem.config.js ./
COPY --chown=node:node .env ./
COPY --chown=node:node config ./config/
COPY --chown=node:node build.js ./
COPY --chown=node:node nodemon.json ./
COPY --chown=node:node .eslintrc.json ./

USER node

# Run development server
ENTRYPOINT [ "dumb-init", "yarn", "dev" ]

FROM dev as build

RUN yarn
RUN yarn transpile

FROM build as prerelease

RUN yarn --production=true

FROM node:16-alpine as prod

RUN apk add bash dumb-init
RUN yarn global add pm2

WORKDIR /usr/app

COPY --from=prerelease --chown=node:node /usr/app/package.json ./
COPY --from=prerelease --chown=node:node /usr/app/ecosystem.config.js/ ./
COPY --from=prerelease --chown=node:node /usr/app/node_modules/ ./node_modules/
COPY --from=prerelease --chown=node:node /usr/app/dist/ ./dist/
COPY --from=prerelease --chown=node:node /usr/app/config/ ./config/
COPY --from=prerelease --chown=node:node /usr/app/.env/ ./.env
COPY --from=dev --chown=node:node /usr/app/src/Config/Locales ./dist/src/Config/Locales
COPY --from=dev --chown=node:node /usr/app/src/App/Presentation/Views ./dist/src/App/Presentation/Views

EXPOSE ${PORT}

USER node

ENTRYPOINT ["dumb-init", "pm2-runtime", "start", "ecosystem.config.js"]
