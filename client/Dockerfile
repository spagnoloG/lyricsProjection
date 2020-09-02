FROM node:14

WORKDIR client

COPY . ./

RUN yarn

RUN yarn build

RUN yarn global add serve 

EXPOSE 8080

CMD ["serve", "-s", "dist"]