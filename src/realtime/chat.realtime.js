import { SocketSettings } from "./socket.realtime.js";

// Clase para manejar el socket del chat
export class ChatSocket extends SocketSettings {
  constructor(io) {
    super(io);
    this.connectedUsers = {};
  }

  setupChatLogic(socket) {
    // Manejar el evento de unión de un usuario al chat
    socket.on("join", (userData) => {
      const userId = userData.id;
      this.connectedUsers[socket.id] = { id: userId, name: userData.name };

      this.io.emit("userList", Object.values(this.connectedUsers));
      this.io.emit("userCount", Object.keys(this.connectedUsers).length);
    });

    // Manejar el evento de envío de mensajes en el chat
    socket.on("chatMessage", (message) => {
      const senderInfo = this.connectedUsers[socket.id];
      this.io.emit("chatMessage", {
        ...message,
        sender: senderInfo.id,
        senderName: senderInfo.name,
      });
    });

    // Manejar el evento de desconexión de un usuario
    socket.on("disconnect", () => {
      const disconnectedUserName = this.connectedUsers[socket.id];
      delete this.connectedUsers[socket.id];
      this.io.emit("userList", Object.values(this.connectedUsers));
      this.io.emit("userCount", Object.keys(this.connectedUsers).length);
      this.io.emit("userDisconnected", disconnectedUserName);
    });
  }

  handleConnection(socket) {
    super.handleConnection(socket);
    this.setupChatLogic(socket);
  }
}
