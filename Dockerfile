FROM node:current-slim

WORKDIR /usr/local/app

RUN npm install -g @vue/cli

CMD ["npm", "run", "serve"]
