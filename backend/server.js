import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.router.js";
import cors from "cors";

// App Config
const app = express();

// to access environment variables in .env file
dotenv.config();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// user api end point
app.use("/api/user", userRouter);

// test api end point
app.get("/", (req, res) => {
  res.send("Portfolio backend is running successfully...");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`The backend is up on port ${port}`);
});
