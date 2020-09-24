export default (io) => {
    io.on('connection', socket => {
        socket.on('listen_registrarCliente', data => {
            io.emit('cast_registrarCliente', data);
        });
        socket.on('listen_solicitarCotizacion', data => {
            io.emit('cast_solicitarCotizacion', data);
        });
        socket.on('listen_registrarFichaTecnica', data => {
            io.emit('cast_registrarFichaTecnica', data);
        });
        socket.on('listen_registrarFichaTextil', data => {
            io.emit('cast_registrarFichaTextil', data);
        })
    })
}