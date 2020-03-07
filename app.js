const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const mustache = mustacheExpress();
const bodyParser = require('body-parser');
require('dotenv/config');

// App setup
const port = process.env.PORT || 3000;
//const { Client } = require('pg');
app.use(bodyParser.urlencoded({ extended: false }));

// Import routes
const homeRoute = require('./routes/home');
const createBlogRoute = require('./routes/create');
const dashboard = require('./routes/dashboard');
const about = require('./routes/about');
const db = require('./database/db');

// setup mustache express
mustache.cache = null;
app.engine('mustache', mustache);
app.set('view engine', 'mustache');
app.set('views', __dirname);

// Routes
app.use(express.static('www'));
app.use('/home', homeRoute);
app.use('/create', createBlogRoute);
app.use('/dashboard', dashboard);
app.use('/about', about);

// query to database
// db
//     .query('SELECT * FROM blog_type;')
//     .then(res => console.log(res.rows))
//     .catch(e => console.log('ERR: ${e}'))
//     .finally(db.end())

// start server
app.listen(port, function(err) {
    if (err) {
        console.log('SERVER ERR: ', err);
    } else {
        console.log('Listening on port ', port);
    }
});