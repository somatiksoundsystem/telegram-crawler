FROM node:10-alpine

WORKDIR /app

RUN apk add --no-cache bash make gcc g++ python

RUN npm install -g pm2

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run make

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
