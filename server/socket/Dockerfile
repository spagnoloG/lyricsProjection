FROM node:15.0-alpine3.10

WORKDIR /socket

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "serve"]