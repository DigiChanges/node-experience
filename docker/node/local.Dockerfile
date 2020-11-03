FROM node:14-stretch

RUN npm install --global yarn cross-env --force

CMD exec /bin/bash -c "trap : TERM INT; sleep infinity & wait"
