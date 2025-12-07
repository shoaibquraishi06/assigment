const express = require('express');
const cookieParser = require("cookie-parser");
const authRouter = require('./routes/auth.routes');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cookieParser());
   




app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


app.use('/api/auth', authRouter);

app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
