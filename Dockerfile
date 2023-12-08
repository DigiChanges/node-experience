FROM digichanges/nexp:1.2 AS dev

WORKDIR /home/node/app

COPY --chown=node:node ["package.json", "pnpm-lock.yaml", ".husky", ".huskyrc", "/home/node/app/"]

RUN pnpm install

RUN chown node:node -R node_modules

COPY --chown=node:node [".", "/home/node/app/"]

EXPOSE 8089

USER node

ENTRYPOINT ["dumb-init", "pnpm","dev"]

FROM dev AS build

WORKDIR /home/node/app

RUN pnpm build

FROM build AS prerelease

RUN rm -rf node_modules
RUN pnpm install --production --ignore-scripts
RUN chown node:node -R node_modules

RUN cd node_modules/bcrypt && npm rebuild bcrypt --build-from-source

FROM digichanges/nexp:1.2 AS prod

ENV NODE_ENV production

WORKDIR /home/node/app

# Copy js files and change ownership to user node
COPY --chown=node:node package.json pnpm-lock.yaml ecosystem.config.js ./
COPY --from=prerelease --chown=node:node /home/node/app/node_modules/ ./node_modules/
COPY --from=prerelease --chown=node:node /home/node/app/dist/ ./dist/
COPY --from=prerelease --chown=node:node /home/node/app/config/ ./config/
COPY --from=prerelease --chown=node:node /home/node/app/package.json/ ./package.json

USER node

ENTRYPOINT ["dumb-init", "pnpm", "start"]
