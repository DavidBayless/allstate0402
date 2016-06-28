var request = require('supertest');
var app = require('../app');
var expect = require('chai').expect;
var categories = require('../config/database').get('categories');
var products = require('../config/database').get('products');
var product = {name: 'Gerbil-on-a-string', price:29.99, category: 'Tug Toys', description: 'Adapted from the popular toy of the same name for children, here is Gerbil-on-a-string for your precious fur-baby'}

beforeEach(function() {
  categories.remove({});
  categories.insert({name: 'Tug Toys'});
  categories.insert({name: 'Balls'});
  categories.insert({name: 'Cork'});
  products.remove({});
  products.insert(product);
  products.insert({name: 'Circular Brick', price: 14.99, category: 'Balls', description: 'Triple value purchase as a paper weight, gerbil toy, and future gerbil headstone'});
});

describe('/categories', function() {
  describe('get /categories', function() {
    it('should have a status code of 200', function(done) {
      request(app).get('/categories')
        .expect(200, done);
    });
    it('should return a JSON object', function(done) {
      request(app).get('/categories')
        .expect(function(response) {
          expect(response.body).to.be.instanceOf(Array);
          expect(response.body[0].name).to.equal('Tug Toys');
          expect(response.body[1].name).to.equal('Balls');
          expect(response.body[2].name).to.equal('Cork');
        }).end(done)
    });
  });
  describe('post /categories/new', function() {
    it('should have a status code of 200', function(done) {
      request(app).post('/categories/new')
        .expect(200, done);
    });
    it('should successfully insert a new category', function(done) {
      request(app).post('/categories/new')
        .send({name: 'Tiny Wine Glasses'})
        .then(function(data) {
          request(app).get('/categories')
            .expect(function(response) {
              expect(response.body[3].name).to.equal('Tiny Wine Glasses');
            }).end(done)
        });
    });
  });
});
describe('/products', function() {
  describe('get /products', function() {
    it('should have a status code of 200', function(done) {
      request(app).get('/products').expect(200, done);
    });
    it('should return a JSON object', function(done) {
      request(app).get('/products')
        .expect(function(response) {
          expect(response.body).to.be.instanceOf(Array)
          expect(response.body[0].name).to.equal('Gerbil-on-a-string');
          expect(response.body[1].name).to.equal('Circular Brick');
        }).end(done);
    });
  });
  describe('post /products/new', function() {
    it('should have a status code of 200', function(done) {
      request(app).post('/products/new').expect(200, done);
    });
    it('should successfully insert a new product', function(done) {
      request(app).post('/products/new')
        .send({name: 'Indy-Gerbil Hat', price: 108.99, category: 'Clothing', description: 'Purchase as part of a val-u pack with the circular brick for historical reenactments with your beloved rodents'})
        .then(function() {
          request(app).get('/products')
            .expect(function(response) {
              expect(response.body[2].name).to.equal('Indy-Gerbil Hat');
            }).end(done);
        });
    });
  });
  describe('put / products', function(){
    it('should successfully update an entire resource', function(done){
      request(app).get('/products').then(function(data){
        var id = data.body[0]._id;
        product.name = 'Gerbil-on-a-stick';
        request(app).put('/products/'+id)
        .send(product).then(function(){
          request(app).get('/products')
          .expect(function(response){
            expect(response.body[0].name).to.equal('Gerbil-on-a-stick')
          }).end(done)
        });
      });
    });
  });
});
