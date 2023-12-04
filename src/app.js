import express, { urlencoded } from 'express';
import 'dotenv/config'
import cookieParser from "cookie-parser";
import { db } from './db/index.db.js';
import indexRouter from './routes/index.route.js';
import ApiError from './errors/api.error.js';


//npm install --dev prettier
//npm run format

try {
  await db.sequelize.authenticate();
  console.log("Connection has been established successfully.");
  db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
  });
}
catch (error) {
  console.log(`Unable to connect to the database: ${error}`);
}

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

//ROUTES
app.use('/api', indexRouter);

//TODO: MIDDLEWARE para atrapar errores NATIVOS
app.use((req, res, next) => {
  error(JSON.stringify({ status: 404, message: `No existe el recurso solicitado ${req.originalUrl}` }));
  res.status(404).json({ status: 404, message: "No existe el recurso solicitado" });
});


//TODO: MIDDLEWARE para atrapar errores con el GlobalHandleError
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.errorCode).json({ status: err.errorCode, error: err.message });
  } else {
    res.status(500).json({ status: 500, error: err.message });
  }
});


app.listen(PORT, () => {
  console.log('Listening on port 3000');
});
