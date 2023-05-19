// This will make the env available for the whole app
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOption');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const { logEvents } = require('./middleware/logger');
const PORT = process.env.PORT || 3500;

console.log('👆', process.env.NODE_ENV);
connectDB();

// Custom log middleware
app.use(logger);

app.use(express.json());

// Third party middleware
app.use(cookieParser());
app.use(cors(corsOptions));

// Tells express where to find static files like css or images - middleware
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root.js'));

// When resource not found show 404 page
app.use('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

// Error handler middleware
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('👯‍♂️connected to mongoDB');
    app.listen(PORT, () => {
        console.log('🤙server is listening on port ', PORT);
    });
});

mongoose.connection.on('error', (err) => {
    console.log('😐', err);
    logEvents(
        ` ${err.no}: ${err.code} \t ${err.syscall}\t${err.hostname}    `,
        'mongoErrLog.log'
    );
});
