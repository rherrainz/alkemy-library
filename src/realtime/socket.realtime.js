export class SocketSettings {
    constructor(io, eventListener) {
        this.io = io;
        this.eventListener = eventListener;
    
        this.handleConnection = this.handleConnection.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);
    
        this.setupSocket();
    }

    setupSocket() {
        this.io.on('connection', this.handleConnection);
    }

    handleConnection(socket) {
        console.log(`Usuario conectado`);

        // Si se proporciona un eventListener, úsalo
        if (this.eventListener) {
            this.eventListener(socket);
        }

        socket.on('disconnect', this.handleDisconnect);
    }

    handleDisconnect() {
        console.log(`Usuario desconectado`);
    }
}