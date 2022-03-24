FROM node:16 as node

# Builder stage
FROM node AS dev

USER node

RUN mkdir /home/node/cache
WORKDIR /home/node/cache

COPY --chown=node:node package.json yarn.lock ./

RUN yarn

WORKDIR /home/node/app

COPY . .

EXPOSE ${PORT}

# Run development server
ENTRYPOINT [ "bash", "entrypoint.sh" ]

# Final stage
FROM node AS prod

ENV NODE_ENV production

# Update the system
RUN apk --no-cache -U upgrade

# Prepare destination directory and ensure user node owns it
RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app

# Set CWD
WORKDIR /home/node/app

RUN npm install -g pm2

COPY --chown=node:node package.json yarn.lock ecosystem.config.js ./

# Switch to user node
USER node

RUN yarn install --production

# Copy js files and change ownership to user node
COPY --chown=node:node --from=builder /home/node/app/dist ./dist
COPY --chown=node:node --from=builder /home/node/app/config ./config

# Use PM2 to run the application as stated in config file
ENTRYPOINT ["pm2-runtime", "start", "ecosystem.config.js"]
