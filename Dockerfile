FROM node:18-alpine

ENV NODE_ENV=production

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install only production files
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
