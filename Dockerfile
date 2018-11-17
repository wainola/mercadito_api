FROM node:8.12.0
WORKDIR /server
COPY package*.json ./
# COPY ./package-lock.json server/package-lock.json
RUN npm install --silent
RUN npm install -g nodemon

COPY . .

EXPOSE 9000
CMD ["npm", "run", "dev"]