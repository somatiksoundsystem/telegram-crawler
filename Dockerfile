FROM node:10-alpine

WORKDIR /app

RUN apk update
RUN apk upgrade
# Necessary stuff for td
RUN apk add --update alpine-sdk linux-headers git zlib-dev openssl-dev gperf php php-ctype
# Necessary stuff for node
RUN apk add cmake bash make gcc g++ python

RUN git clone https://github.com/tdlib/td.git

RUN mkdir td/build

RUN export CXXFLAGS=""
RUN cd td/build;cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX:PATH=/usr/local ..
RUN cd td/build;cmake --build . --target install
RUN ls -l /usr/local

RUN npm install -g pm2

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run make

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
