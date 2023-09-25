var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
  //Authorized user
  //placeholder
  let user = "Jimbo"
  res.render('index',{user});
});

module.exports = router;
