import express from "express";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors())//por quien quiere ser consumida

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);

app.use(express.static("src/public"));

app.use((req, res, next) => {
  res.status(400).json({
    message: "Api endpoint not found",
  });
});

export default app;
