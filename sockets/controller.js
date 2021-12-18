const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController =  (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo)

  
    /* callback es la referencia a la funcion desde el cliente */
    socket.on('siguiente-ticket', (payload, callback) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);

        /* Notificar que hay un nuevo ticket pendiente de asignar */
    })
}

module.exports = {
    socketController
}