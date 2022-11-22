import express from "express";
import authRouter from "./routes/auth.route.js";
import cors from "cors";

const app = express();

app.use(cors())//por quien quiere ser consumida

app.use(express.json());

app.use("/api/v1", authRouter);

app.use((req, res, next) => {
  res.status(400).json({
    message: "Api endpoint not found",
  });
});

export default app;
