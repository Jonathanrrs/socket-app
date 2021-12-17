const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController =  (socket) => {

  
    /* callback es la referencia a la funcion desde el cliente */
    socket.on('enviar-mensaje', (payload, callback) => {
        const id = 123456;
        callback(id);
        socket.broadcast.emit('enviar-mensaje', payload);
    })
}

module.exports = {
    socketController
}