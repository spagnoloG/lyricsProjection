FROM node:15.0-alpine3.10

WORKDIR /api

COPY package*.json ./

RUN yarn

COPY . .

ENV DB_host=db

EXPOSE 4200

CMD ["yarn", "dev"]