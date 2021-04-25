# lyricsProjection

Modern WebApp for lyrics Projection in any place.
Easily enter lyrics into the app, view, edit and project them on a remote screen.

![homepage_image](https://i.ibb.co/SXgQzkg/Optimized-urejena.jpg)

## Features

* Inserting lyrics
* Editing lyrics
* Categorization of lyrics
* Compiling Playlists
* Projection of lyrics
* Projection of playlists
* Multiple projection displays supported
* Active indicator
* Active indicator of the current song in the web interface
* Fully Mobile / Tablet supported

## App gallery

Remote controller:
![app_gallery_1](https://i.ibb.co/FXFrFnM/remote.png)
Playlist controller:
![app_gallery_2](https://i.ibb.co/xS8DHK9/playlist.png)
Inserting new lyrics:
![app_gallery_2](https://i.ibb.co/dcJYyxB/image.png)


## Project Structure
```bash
./client
    ./src
        ./store   <- app state (vuex)
        ./locales <- different translations location
        ./views   <- All routes and components that belong to them
./server
    ./api  <- REST API connected to local mongodb, runs in docker
    ./socket <- socket.io for fastest possible communication between server and projector
``` 



## Installation

Firstly you must have docker and docker-compose installed.
Then clone this app and run **docker-compose up**.
First installation may take some time.

Management app will be available on your localhost at port 80. To preview what is on display you must go to /display route.


Fixes -> forks -> pull requests are welcome.
