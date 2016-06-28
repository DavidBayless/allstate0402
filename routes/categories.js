var express = require('express');
var router = express.Router();
var categories = require('../config/database').get('categories');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200);
  categories.find({}, function(err, data){
    if(err) throw err;
    res.json(data);
  })
});

router.post('/new', function(req, res, next){
  res.status(200);
  categories.insert(req.body, function(err, data){
    if(err) throw err;
    res.json(data);
  });
});

module.exports = router;
