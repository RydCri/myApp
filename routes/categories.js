var express = require('express');
var router = express.Router();
var resource = require('../public/data/categories.json')

router.get('/', async (req, res) => {
    res.send(resource)
    console.log(resource);
});

module.exports = router;
