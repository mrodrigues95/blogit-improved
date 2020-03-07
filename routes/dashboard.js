const express = require('express');
const db = require('../database/db');
const router = express.Router();

// GET requests
router.get('/', (req, res) => {
    db
        .query('SELECT * FROM blog')
        .then(results => {
            res.render('www/views/dashboard', {
                blogs: results.rows
            });
        })
        .catch(e => {
            console.log('SELECT ERR: ', e);
        });
});

// POST requests

module.exports = router;