FROM node:8.12.0
WORKDIR /server
RUN mkdir server
COPY ./package.json server/package.json
# COPY ./package-lock.json server/package-lock.json
RUN npm install --silent
RUN npm install -g nodemon

COPY ./src /server

EXPOSE 9000