FROM node:14

WORKDIR app

COPY . ./socket

RUN cd ./socket
RUN npm install

EXPOSE 30000

CMD ["npm", "run", "serve"]