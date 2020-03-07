const express = require('express');
const db = require('../database/db');
const router = express.Router();

// GET requests
router.get('/', (req, res) => {
    res.render('create-blog'); // show home page
});

// POST requests
router.post('/', (req, res) => {
    req.body.enableComments = Boolean(req.body.enableComments);

    const sql = 'INSERT INTO blog (title, author, commentsenabled, tags, content, category)' +
               'VALUES ($1, $2, $3, $4, $5, $6);';
    const params = [req.body.title, req.body.author, req.body.enableComments, req.body.tag, req.body.content, req.body.type];

    db
        .query(sql, params)
        .then(res => {
            console.log(res.rows)
        })
        .catch(e => {
            console.log('INSERT ERR: ', e)
        });
    res.redirect('/dashboard');
});

module.exports = router;