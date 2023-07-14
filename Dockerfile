FROM digichanges/nexp:1.2 as dev

WORKDIR /home/node/app

COPY --chown=node:node .eslintrc ./
COPY --chown=node:node .husky ./
COPY --chown=node:node .huskyrc ./
COPY --chown=node:node .npmrc ./
COPY --chown=node:node config ./config/
COPY --chown=node:node ecosystem.config.js ./
COPY --chown=node:node nodemon.json ./
COPY --chown=node:node src ./src
COPY --chown=node:node rimraf_cpy.mjs ./
COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node tools ./tools
COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node jest-mongodb-config.js ./
COPY --chown=node:node jest.config.js ./

USER node

RUN pnpm install

ENTRYPOINT ["dumb-init", "pnpm", "dev"]

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

FROM digichanges/nexp:1.1 as prod

RUN npm install -g pnpm pm2

ENV NODE_ENV production

WORKDIR /usr/app

# Copy js files and change ownership to user node
COPY --chown=node:node package.json pnpm-lock.yaml ecosystem.config.js ./
COPY --from=prerelease --chown=node:node /usr/app/node_modules/ ./node_modules/
COPY --from=prerelease --chown=node:node /usr/app/dist/ ./dist/
COPY --from=prerelease --chown=node:node /usr/app/config/ ./config/
COPY --from=prerelease --chown=node:node /usr/app/.env/ ./.env
COPY --from=prerelease --chown=node:node /usr/app/package.json/ ./package.json

USER node

ENTRYPOINT ["dumb-init", "pm2-runtime", "start", "ecosystem.config.js"]
