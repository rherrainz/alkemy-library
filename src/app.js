import express from "express";
import "dotenv/config";
import { db } from "./db/index.db.js";

import indexRouter from "./routes/index.route.js";

try{
  await db.sequelize.authenticate();
  console.log("Connection has been established successfully.");
  db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });
}
catch(error){
  console.log(`Unable to connect to the database: ${error}`);  
}

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api", indexRouter);

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
