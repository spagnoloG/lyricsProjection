FROM node:15.0-alpine3.10

WORKDIR /client

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn run build

RUN yarn global add serve

# Port to expose
EXPOSE 5000

CMD ["serve", "-s", "dist"]