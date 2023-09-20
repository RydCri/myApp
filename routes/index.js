var express = require('express');
var router = express.Router();
// let ejs = require('ejs');
// let people = ['geddy', 'neil', 'alex'];
// let html = ejs.render('<%= people.join(", "); %>', {people: people});
/* GET home page. */
router.get('/', function(req, res) {
  res.render('views/index');
});

module.exports = router;
