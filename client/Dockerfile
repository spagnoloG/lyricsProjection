FROM node:14

WORKDIR client

COPY . ./

RUN npm run build

RUN npm install -g serve 

EXPOSE 8080

CMD ["serve", "-s", "dist"]