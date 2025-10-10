import express from "express";
import { configDotenv } from "dotenv";
import dbConnection from "./config/db.config.js";
import cookieParser from "cookie-parser";
import adminRoute from "./routes/host.route.js";
import route from "./routes/route.js";

const app = express();
configDotenv();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

dbConnection();

app.use("/api/host/", adminRoute);
app.use("/api/", route);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
