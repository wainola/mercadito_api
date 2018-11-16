FROM node:8.12.0-alpine
WORKDIR /src
COPY ./package*.json ./
RUN npm install --silent
RUN npm install -g nodemon

COPY src /app

EXPOSE 9000
CMD npm run dev