FROM node:20-alpine AS dev

RUN apk add dumb-init

RUN corepack enable && corepack install --global pnpm@8.15.1

WORKDIR /home/node

COPY --chown=node:node ["package.json", "pnpm-lock.yaml", ".husky", ".huskyrc", "/home/node/"]

RUN pnpm install

COPY --chown=node:node [".", "/home/node/"]

EXPOSE 8089

USER node

ENTRYPOINT ["dumb-init", "pnpm","dev"]

FROM dev AS build

USER node

RUN pnpm build

USER root

RUN rm -rf node_modules

FROM build AS prerelease

USER node

RUN pnpm install --production --ignore-scripts \
    && cd node_modules/bcrypt  \
    && npm rebuild bcrypt --build-from-source

FROM node:20-alpine AS prod

RUN corepack enable && corepack install --global pnpm@8.15.1

ENV NODE_ENV production

WORKDIR /home/node

# Copy js files and change ownership to user node
COPY --from=prerelease /home/node/node_modules/ ./node_modules/
COPY --from=prerelease /home/node/dist/ ./dist/
COPY --from=prerelease /home/node/config/ ./config/
COPY --from=prerelease /home/node/package.json/ ./package.json
COPY --from=prerelease /home/node/pnpm-lock.yaml/  ./pnpm-lock.yaml

USER node

ENTRYPOINT ["dumb-init", "pnpm", "start"]
