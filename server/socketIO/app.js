const Express = require('express')();
const Http = require('http').Server(Express)
const Socketio = require('socket.io')(Http);


var state = {
    currentLyric: -1,
    currentPlaylist: -1
}

Socketio.on('connection', socket => {
    socket.on('remoteMessage', data => {
        state = data
        Socketio.emit('onChangedState', state)
        console.log(state)
    })
    socket.on('getCurrentState', () => {
        Socketio.emit('onChangedState', state)
    })
});

Http.listen(3000, () => {
    console.log('Listening at :3000...');
});



