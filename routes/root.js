const express = require('express');
const router = express.Router();
const path = require('path');

// If requested route is only '/' or index file with optional extension
router.get('^/$|/index(.html)?', (req, res) => {
    // Telling the app where it will find the index html file
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;
