import express from "express";
import "dotenv/config";

import indexRouter from "./routes/index.route.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api", indexRouter);

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
