import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./domain/auth";
import todoRouter from "./domain/todo";
import { authMiddleware } from "./middleware/auth";

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/todos", authMiddleware, todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
