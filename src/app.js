import express, { urlencoded } from 'express';
import 'dotenv/config'
import cookieParser from "cookie-parser";
import { db } from './db/index.db.js';
import indexRouter from './routes/index.route.js';


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

app.use("/api", indexRouter);

//ROUTES
app.use('/api', indexRouter);

app.listen(PORT, () => {
  console.log('Listening on port 3000');
});
