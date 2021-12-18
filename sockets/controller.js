const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController =  (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
  
    /* callback es la referencia a la funcion desde el cliente */
    socket.on('siguiente-ticket', (payload, callback) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);

        /* Notificar que hay un nuevo ticket pendiente de asignar */
    });

    socket.on('atender-ticket', ({escritorio}, callback) => {
        
        if(!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatiorio'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        /* Notificar cambio en los últimos 4 tickets */
        /* broadcast para que le llegue a las otras pantallas */
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);

        if(!ticket) {
            callback({
                ok:false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    });
}

module.exports = {
    socketController
}