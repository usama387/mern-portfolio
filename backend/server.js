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

// Allow ALL origins
const allowedOrigins = [
  "https://ai-blood-flow-frontend.vercel.app", // Production
  "http://localhost:5173", // Local Vite dev
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["set-cookie"],
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

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
