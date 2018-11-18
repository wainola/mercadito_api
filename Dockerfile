FROM node:8.12.0
RUN mkdir -p /usr/server
WORKDIR /usr/server
COPY package*.json ./
# COPY ./package-lock.json server/package-lock.json
RUN npm install --silent
RUN npm install -g nodemon
RUN npm install -g knex

COPY . .
EXPOSE 9000
# CMD ["npm", "run", "dev"]