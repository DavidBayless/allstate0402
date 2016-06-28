var express = require('express');
var router = express.Router();
var products = require('../config/database').get('products');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200);
  products.find({}, function(err, data){
    if(err) throw err;
    res.json(data);
  })

});

router.post('/new', function(req, res, next){
  res.status(200);
  products.insert(req.body, function(err, data){
    if(err) throw err;
    res.json(data);
  });
});

router.put('/:id', function(req, res, next) {
  products.updateById(req.params.id, req.body, function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

module.exports = router;
