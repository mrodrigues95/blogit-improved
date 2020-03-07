const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('www/views/home'); // show home page
});

module.exports = router;