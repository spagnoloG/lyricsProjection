const Express = require('express')();
const Http = require('http').Server(Express)
const Socketio = require('socket.io')(Http);


var state = {
    currentLyric: null,
    currentPlaylist: null
}

Socketio.on('connection', socket => {
    socket.on('remoteMessage', data => {
        state = data
        logState()
        Socketio.emit('onChangedState', state)
    })
    socket.on('remoteScroll', data => {
        Socketio.emit('onScroll', data)
    })
    socket.on('getCurrentState', () => {
        logState()
        Socketio.emit('onChangedState', state)
    })
    socket.on('refreshDisplay', () => {
        console.log("Refreshing display...")
        Socketio.emit('onRefresh')
    })
});

Http.listen(3000, () => {
    console.log('Listening at :3000...');
});

function logState(){
    console.log('Current lyric: ' + state.currentLyric)
    if(state.currentPlaylist) {
        console.log('Current playlist: ' + state.currentPlaylist)
    }
} 



