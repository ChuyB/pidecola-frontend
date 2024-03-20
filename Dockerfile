FROM node:20
RUN mkdir -p /home/src/api
WORKDIR /home/src/web
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 3000