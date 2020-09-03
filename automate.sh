#!/bin/sh
printf 	'\xF0\x9F\x9A\xA2'
echo "Building docker images automatically"
sudo docker image ls
sudo docker image rm -f client
sudo docker image rm -f api
sudo docker image rm -f socket
cd client
echo "Building client docker image"
sudo docker build -t client .
cd ..
cd server/api
echo "Building api docker image"
sudo docker build -t api .
cd ..
cd socketIO
echo "Building socket docker image"
sudo docker build -t socket .
cd ..
cd ..
sudo docker-compose up