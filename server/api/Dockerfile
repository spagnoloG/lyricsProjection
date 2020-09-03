FROM node:14

RUN mkdir -p /usr/src/api

WORKDIR /usr/src/api
ADD . /usr/src/api
RUN yarn

ENV NODE_ENV=production

# Port to expose
EXPOSE 4200

CMD ["yarn", "serve"]