import socketio from 'socket.io';

const io = socketio(5000);

io.on('connection', (socket) => {
    // ...

    socket.on('chatMessage', (data) => {
        // Process the chat message, e.g., save to database, emit to other users, etc.
        io.emit('chatMessage', { message: data.message });
    });

    // ...
});
