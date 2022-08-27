FROM node:15.0-alpine3.10

WORKDIR /api

COPY . .

WORKDIR /api

RUN yarn install

ENV DB_host=db

RUN yarn global add nodemon

EXPOSE 4200

CMD ["yarn", "dev"]
