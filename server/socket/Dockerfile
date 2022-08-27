FROM node:15.0-alpine3.10

WORKDIR /socket

COPY . .

RUN yarn install

RUN yarn global add nodemon

EXPOSE 3000

CMD ["yarn", "serve"]
