#!/bin/sh
# Requirements: local mongodb, yarn and global serve package
echo "Welcome to lyrics projection app :)"
cd client
echo "Building client..."
yarn install
yarn build
cd ..
cd server/socketIO
echo "Starting socket-io server..."
yarn install
yarn serve &
cd ..
cd api
echo "Starting api server..."
yarn install
yarn serve &
cd ..
cd ..
echo "serving client..."
cd client 
sudo serve -s dist -l 80 &
echo "Starting electron window..."
cd ..
cd electron-client
yarn install
yarn start &
echo "Successfully completed installation and started app:)"