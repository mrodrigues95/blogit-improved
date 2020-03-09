const express = require('express');
const db = require('../database/db');
const router = express.Router();
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// GET requests
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM blog WHERE id = $1;';
    const params = [req.params.id];
    
    db
        .query(sql, params)
        .then(results => {
            res.render('edit', {
                blog: results.rows[0]
            });
        })
        .catch(e => {
            console.log('FETCH BLOG ERR: ', e);
            res.redirect('/dashboard');
        })
});

// POST requests
router.post('/:id', (req, res) => {
    const editChoice = req.body.editBlog;

    // check if user wants to update/delete blog or go back
    if (editChoice == "cancel") {
        res.redirect('/dashboard');

    } else if (editChoice == "delete") {
        const sql = 'DELETE FROM blog WHERE id = $1;';
        const params = [req.params.id];
    
        db
            .query(sql, params)
            .then(results => {
                console.log('Delete results: ', results);
                res.redirect('/dashboard');
            })
            .catch(e => {
                console.log('DELETE ERR: ', e)
            });

    } else if (editChoice == "update") {
        req.body.enableComments = Boolean(req.body.enableComments);

        const sql = 'UPDATE blog SET title = $1, author = $2, commentsenabled = $3, tags = $4, content = $5, category = $6 WHERE id = $7;';
        const params = [req.body.title, req.body.author, req.body.enableComments, req.body.tag, req.body.content, req.body.type, req.params.id];
    
        db
            .query(sql, params)
            .then(results => {
                console.log('Update results: ', results);
                res.redirect('/dashboard');
            })
            .catch(e => {
                console.log('UPDATE ERR: ', e)
            });
    }
});

module.exports = router;