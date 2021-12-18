const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAtender.disabled = true;
    
});

socket.on('ultimo-ticket', (ultimoTicket) => {
    // lblNuevoTicket.innerText = 'Ticket ' + ultimoTicket;
})


btnAtender.addEventListener( 'click', () => {

    // socket.emit('siguiente-ticket', null, (ticket) => {
    //     console.log(ticket);
    //     lblNuevoTicket.innerText = ticket;
    // });

});