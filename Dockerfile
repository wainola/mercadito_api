FROM node:8.12.0-alpine
RUN mkdir -p /app
WORKDIR /app

RUN npm install -g nodemon
COPY package.json /app/package.json
RUN npm install --silent

COPY . /app
EXPOSE 9000
CMD ['node', 'server.js']