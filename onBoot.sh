#!/bin/sh
# Requirements: local mongodb, yarn and global serve package
echo "Starting lyrics projection app:)"
cd server/socketIO
echo "Starting socket-io server..."
yarn serve &
cd ..
cd api
echo "Starting api server..."
yarn serve &
cd ..
cd ..
echo "serving client..."
cd client 
serve -s dist & 
echo "Successfully started projection app:)"