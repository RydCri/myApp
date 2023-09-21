var express = require('express');
var router = express.Router();
/* router works, need to access json */
router.get('/', function(req, res, next) {
    res.send('/dummyDB.json');
});

module.exports = router;
