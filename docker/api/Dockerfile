FROM node:14.15.4-alpine3.10

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm link

RUN chmod +x ./scripts/api.sh

EXPOSE $BACKEND_PORT