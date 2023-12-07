import express, { urlencoded } from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { db } from "./db/index.db.js";
import indexRouter from "./routes/index.route.js";
import ApiError from "./errors/api.error.js";
import { dueReminder } from "./utils/cron.util.js";

import http from "http";
import { Server } from 'socket.io';
import { NotificationSettings } from './realtime/notifiy.realtime.js'


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('io', io);

try {
  await db.sequelize.authenticate();
  console.log("Connection has been established successfully.");
  db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
  });
} catch (error) {
  console.log(`Unable to connect to the database: ${error}`);
}

//Se crea una instancia de la case que contiene la conf del socket
const notifyEvent = (socket) => {
  console.log('Comportamiento personalizado para el nuevo socket', socket.id);
  // Aquí puedes agregar cualquier lógica específica para el nuevo socket
};

new NotificationSettings(io, notifyEvent);

// io.on('connection', (socket) => {
//   console.log(`Usuario conectado`);
  
//   socket.on('notification', (msg) => {
//     console.log('Notificación recibida:', msg);
//   });

//   socket.on('disconnect', () => {
//     console.log(`Usuario desconectado`);
//   });
// });


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

//ROUTES
app.use("/api", indexRouter);

//TODO: MIDDLEWARE para atrapar errores NATIVOS
app.use((req, res, next) => {
  error(
    JSON.stringify({
      status: 404,
      message: `No existe el recurso solicitado ${req.originalUrl}`,
    }),
  );
  res
    .status(404)
    .json({ status: 404, message: "No existe el recurso solicitado" });
});

//TODO: MIDDLEWARE para atrapar errores con el GlobalHandleError
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res
      .status(err.errorCode)
      .json({ status: err.errorCode, error: err.message });
  } else {
    res.status(500).json({ status: 500, error: err.message });
  }
});

//dueReminder => envía un mail a cada usuario que debe un libro
dueReminder();

server.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});
