var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../public/quotes.js');
var db = require('../db.js');

before(function(done) {
    // use this after you have completed the connect function
    db.connect(function(err, db) {
       if (err) return done(err);
       else done();
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        assert.include(arr, Quote.getElementByIndexElseRandom(arr));
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.equal(arr, Quote.getElementByIndexElseRandom(arr, 0),1);

       
    it("should return the last element if we also pass the index", function() {
       assert.equal(arr, Quote.getElementByIndexElseRandom(arr, 4),5);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        assert.equal(Quote.getQuotesFromJSON().length, 102);

    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        assert.equal(Quote.getQuotesFromJSON(0).author, 'Kevin Kruse');
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        assert.typeOf(Quote.getQuoteFromJSON().author, 'string');
        assert.typeOf(Quote.getQuoteFromJSON().text, 'string');

    });
    it('should return a random quote if index not specified', function() {

    });
    it('should return the first quote if we pass 0', function() {
        var quote = Quote.getQuoteFromJSON(0);
        assert.equal(quote.author, 'Kevin Kruse');
        assert.equal(quote.text, 'Life isn’t about getting and having, it’s about giving and being');

    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(err, seeded));
        assert.equal(seeded, true);
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        db.db().collection('quotes').count(function (err, count) {
            assert.equal(count, 102);
        })
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function(err, seeded) {
            assert.equal(seeded, false);
        })
    });
    it('should not seed db again if db is not empty', function(done) {
        db.db().collection('quotes').count(function(err, count) {
            assert.equal(count, 102);
        
        })
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        var array = Quote.getQuotesFromDB(function (err, res) {
            assert.equal(res.length, 102);
            // body...
        })
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
            Quote.getQuoteFromDB(function (err, res) {
                Quote.getQuotesFromDB(function (error, array) {
                    assert.include(array, res);
                })      
            
            })
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuoteFromDB(function (err, res) {
            assert.equal(res.author, 'Kevin Kruse');
            assert.equal(res.text, 'Life isn’t about getting and having, it’s about giving and being');

        })
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request.get('/ay haga').expect(404);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
    });
});