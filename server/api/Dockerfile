FROM mhart/alpine-node:10

RUN set -eux \
    & apk add \
        --no-cache \
        nodejs \
        yarn

WORKDIR app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 9000

CMD ["yarn", "run", "serve"]
