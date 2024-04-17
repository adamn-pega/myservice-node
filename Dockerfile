FROM node:latest

COPY . .
RUN npm ci
RUN tsc

RUN apk update && apk upgrade && apk add --no-cache openssl
RUN apk add --no-cache --virtual .build-deps alpine-sdk

CMD ["node", "dist/index.js"]