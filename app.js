const express = require('express');
const mustacheExpress = require('mustache-express');
require('dotenv').config();

const app = express();
const mustache = mustacheExpress();

// Import routes
const homeRoute = require('./routes/home');
const createBlogRoute = require('./routes/create');
const dashboard = require('./routes/dashboard');
const about = require('./routes/about');

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

// start server
const port = process.env.PORT || 3000;

app.listen(port, function(err) {
    if (err) {
        console.log('SERVER ERR: ', err);
    } else {
        console.log('Listening on port ', port);
    }
});