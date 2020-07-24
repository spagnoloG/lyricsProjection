const Express = require("express")();
const Http = require("http").Server(Express)
const Socketio = require("socket.io")(Http);


var lyricIndex = 0

Socketio.on("connection", socket => {
    socket.on("moveTo", data => {
        lyricIndex = data
        Socketio.emit("remoteIndex", lyricIndex);
    });
});

Http.listen(3000, () => {
    console.log("Listening at :3000...");
});



