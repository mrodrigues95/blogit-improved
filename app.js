const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const mustache = mustacheExpress();
const bodyParser = require('body-parser');
require('dotenv/config');

// App setup
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));

// Import routes
const homeRoute = require('./routes/home');
const createBlogRoute = require('./routes/create');
const dashboardRoute = require('./routes/dashboard');
const aboutRoute = require('./routes/about');

// setup mustache express
mustache.cache = null;
app.engine('mustache', mustache);
app.set('view engine', 'mustache');
app.set('views', __dirname);

// Routes
app.use(express.static('www'));
app.use('/home', homeRoute);
app.use('/create', createBlogRoute);
app.use('/dashboard', dashboardRoute);
app.use('/about', aboutRoute);

// Start server
app.listen(port, function(err) {
    if (err) {
        console.log('SERVER ERR: ', err);
    } else {
        console.log('Listening on port ', port);
    }
});