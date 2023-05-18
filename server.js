const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOption');
const PORT = process.env.PORT || 3500;

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

app.listen(PORT, () => {
    console.log('🤙server is listening on port ', PORT);
});
