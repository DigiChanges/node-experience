FROM digichanges/nexp:1.4 AS dev

WORKDIR /home/node

USER node

COPY --chown=node:node ["package.json", "pnpm-lock.yaml", ".husky", ".huskyrc", "/home/node/"]

RUN pnpm install

COPY --chown=node:node [".", "/home/node/"]

EXPOSE 8089

ENTRYPOINT ["dumb-init", "pnpm","dev"]

FROM dev AS build

RUN pnpm build

RUN rm -rf node_modules

FROM build AS prerelease

USER node

RUN pnpm install --production --ignore-scripts \
    && cd node_modules/bcrypt  \
    && npm rebuild bcrypt --build-from-source

FROM digichanges/nexp:1.4 AS prod

ENV NODE_ENV production

WORKDIR /home/node

USER node

# Copy js files and change ownership to user node
COPY --from=prerelease /home/node/node_modules/ ./node_modules/
COPY --from=prerelease /home/node/dist/ ./dist/
COPY --from=prerelease /home/node/package.json/ ./package.json
COPY --from=prerelease /home/node/pnpm-lock.yaml/  ./pnpm-lock.yaml

ENTRYPOINT ["dumb-init", "pnpm", "start"]
