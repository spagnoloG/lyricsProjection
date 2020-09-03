FROM node:14

RUN mkdir -p /usr/src/client

WORKDIR /usr/src/client
ADD . /usr/src/client

RUN yarn

ENV NODE_ENV=production

EXPOSE 3000

CMD ["yarn", "serve"]