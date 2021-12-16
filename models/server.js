const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        /* socket.io con express */
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        /* eventos de Sockets */
        this.sockets();
    }


    middlewares() {

        // CORS
        this.app.use(cors());

        // Directorio Público
        this.app.use(express.static('public'));


    }

    routes() {
        // this.app.use( this.paths.auth, require('../routes/auth'));
    }

    sockets() {
        this.io.on('connection', socket => {

            socket.on('disconnect', () => {
                // console.log('cliente desconectado', socket.id);
            });
            /* callback es la referencia a la funcion desde el cliente */
            socket.on('enviar-mensaje', (payload, callback) => {

                const id = 123456;
                callback({id, fecha: new Date().getTime()})

                // this.io.emit('enviar-mensaje', payload);
            })
        });
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;