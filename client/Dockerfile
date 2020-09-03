FROM node:14

RUN mkdir -p /usr/src/client

WORKDIR /usr/src/client
ADD . /usr/src/client
RUN yarn
RUN yarn global add serve

ENV NODE_ENV=production

RUN yarn build

# Remove unused directories
RUN rm -rf ./src
RUN rm -rf ./build

# Port to expose
EXPOSE 5000

CMD ["serve", "-s", "dist"]