#!/bin/bash

printf "Stopping all containers\n"
docker ps | awk '{print $1}' | xargs docker kill

printf "Deleting all containers\n"
docker container ls --filter "status=exited" | awk '{ print $1 }' | xargs docker container rm

printf "Deleting all images\n"
docker image ls | awk '{print $3}' | xargs docker image rm --force
