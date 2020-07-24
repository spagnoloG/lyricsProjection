FROM mhart/alpine-node:10

RUN apk add --update \
	nodejs-npm

WORKDIR app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 30000

CMD ["npm", "run", "serve"]