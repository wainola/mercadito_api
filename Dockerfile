FROM node:8.12.0-alpine
WORKDIR /src
RUN mkdir server
COPY ./package.json /src/package.json
COPY ./package-lock.json /src/package-lock.json
COPY . /src
RUN npm install --silent
RUN npm install -g nodemon

EXPOSE 9000
CMD npm run dev