#!/bin/sh
# Requirements: local mongodb, yarn and global serve package
# Raspberry Pi autostart folder: .config/autostart
echo "Starting lyrics projection app:)"
cd ~/Documents/lyricsProjection
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
sudo serve -s dist -l 80 &
echo "Starting electron app..."
cd ~/Documents/lyricsProjection/electron-client
yarn start &
echo "Successfully started projection app:)"