const express = require('express');

const app = express();

app.use(express.static('www'));

// start server
const port = process.env.PORT || 3000;

app.listen(port, function(err) {
    if (err) {
        console.log('ERR: ', err);
    } else {
        console.log('Listening on port ', port);
    }
});