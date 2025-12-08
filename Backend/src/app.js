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


// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use("/api/auth", authRouter);

// Catch-all route for SPA (must be after static and API routes)
app.get('*name', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
