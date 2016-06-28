require('../helper');

var http = require('http'),
    server;

before(function() {
  server = http.createServer(require('../../app'));
  server.listen(0);
  browser.baseUrl = 'http://localhost:' + server.address().port;
});

beforeEach(function() {
  return browser.ignoreSynchronization = true;
});

after(function(){
  server.close();
});

describe('Given I visit /', function(){
  it('I should see new category form', function(done){
    browser.get('/');
    element(by.tagName('legend')).getText().then(function(text){
      expect(text).to.equal('New Category Form');
      done();
    });
  });
  describe('New category form', function(){
    it('I should be able to enter information into new category form', function(done){
      browser.get('/');
      var categoryInput= element(by.css('[name="categoryName"]'))
      categoryInput.sendKeys('Tiny Houses')
      categoryInput.getAttribute("value").then(function(text){
        expect(text).to.equal('Tiny Houses');
        done();
      });
    });
    it('I should be able to add a new category', function(done){
      browser.get('/');
      var categoryInput= element(by.css('[name="categoryName"]'));
      categoryInput.sendKeys('Gerbil Robot Companion');
      element(by.id('submit')).click();
      categoryInput.getAttribute('value').then(function(text) {
        expect(text).to.equal('');
        done();
      })
    });
  });
  describe('New Product Form', function() {
    it('I should be able to enter text into the name field', function(done) {
      var nameInput = element(by.css('[name="name"]'));
      nameInput.sendKeys('Gerbilbot-6000XXX');
      nameInput.getAttribute('value').then(function(text) {
        expect(text).to.equal('Gerbilbot-6000XXX');
        done();
      })
    })
  })
});
