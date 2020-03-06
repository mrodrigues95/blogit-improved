const express = require('express');
const mustacheExpress = require('mustache-express');

const app = express();
const mustache = mustacheExpress();

app.use(express.static('www'));

// setup mustache express
mustache.cache = null;
app.engine('mustache', mustache);
app.set('view engine', 'mustache');

// GET requests
app.get('/home', (req, res) => {
    res.render(__dirname + '/www/views/home'); // show home page
});

app.get('/create', (req, res) => {
    res.render(__dirname + '/www/views/create-blog'); // show create-blog page
});

app.get('/dashboard', (req, res) => {
    res.render(__dirname + '/www/views/dashboard'); // show dashboard page
});

app.get('/about', (req, res) => {
    res.render(__dirname + '/www/views/about'); // show about page
});

// start server
const port = process.env.PORT || 3000;

app.listen(port, function(err) {
    if (err) {
        console.log('ERR: ', err);
    } else {
        console.log('Listening on port ', port);
    }
});