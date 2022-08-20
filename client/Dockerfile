FROM node:16.3.0-alpine 

WORKDIR /client

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn run build

RUN yarn global add serve

EXPOSE 5000

CMD ["serve", "-s", "dist", "-l", "5000"]
