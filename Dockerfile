FROM node:16-alpine as dev

RUN apk add bash

WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY src src/

COPY tsconfig.json ./
COPY babel.config.json ./
COPY ecosystem.config.js ./
COPY .env.dev ./
COPY config config/

RUN yarn transpile

FROM dev as prerelease

RUN yarn --production=true
RUN yarn pre-build

FROM node:16-alpine as prod

RUN apk add bash
RUN yarn global add pm2

WORKDIR /app

RUN adduser -D -S limited-user

COPY --from=prerelease /app/package.json ./
COPY --from=prerelease /app/ecosystem.config.js/ ./
COPY --from=prerelease /app/node_modules/ ./node_modules/
COPY --from=prerelease /app/dist/ ./dist/
COPY --from=prerelease /app/config/ ./config/
COPY --from=prerelease /app/.env.dev/ ./.env

USER limited-user
EXPOSE ${PORT}

# ENTRYPOINT ["pm2-runtime", "start", "ecosystem.config.js"]

CMD ["yarn","start"]
