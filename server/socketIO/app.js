const Express = require('express')();
const Http = require('http').Server(Express)
const Socketio = require('socket.io')(Http);


var state = {
    currentLyric: -1,
    currentPlaylist: null
}

Socketio.on('connection', socket => {
    socket.on('remoteMessage', data => {
        state = data
        Socketio.emit('onChangedState', state)
    })
    socket.on('remoteScroll', data => {
        Socketio.emit('onScroll', data)
    })
    socket.on('getCurrentState', () => {
        console.log(state)
        Socketio.emit('onChangedState', state)
    })
});

Http.listen(3000, () => {
    console.log('Listening at :3000...');
});



