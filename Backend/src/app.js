const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS FIX — add your Render frontend URL here
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://assignment-05mu.onrender.com" // your render frontend
    ],
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRouter);

// REMOVE wildcard catch-all (Express 5 does not allow "*")
// Backend should not serve frontend, so DO NOT include:
// app.get("*", ...);

module.exports = app;
