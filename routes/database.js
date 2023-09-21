var express = require('express');
var router = express.Router();
var resource = require('../public/data/dummyDB.json')

router.get('/', async (req, res) => {
    res.send(`${(JSON.stringify(resource))}`);
});

module.exports = router;
