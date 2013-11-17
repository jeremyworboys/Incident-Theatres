/**
 * List Cinemas Test
 * @copyright 2013 Jeremy Worboys
 */

var chai = require('chai');
var request = require('supertest');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var app = require('../app');
var fakes = sinon.sandbox.create();

describe('List Cinemas', function() {
    var findCinemas;

    beforeEach(function() {
        findCinemas = fakes.stub(app.models.cinema, 'find').yields(null, []);
    });

    afterEach(function() {
        fakes.restore();
    });

    describe('/cinemas', function() {

        it('should return json', function(done) {
            request(app)
                .get('/cinemas')
                .expect('content-type', /json/)
                .expect(200, done);
        });

        it('should follow jsend spec', function(done) {
            request(app)
                .get('/cinemas')
                .end(function(err, res) {
                    expect(res.body.status).to.equal('success');
                    expect(res.body.data).to.exist;
                    expect(res.body.data).to.be.a('object');
                    expect(res.body.data.cinemas).to.exist;
                    expect(res.body.data.cinemas).to.be.a('array');
                    done(err);
                });
        });

        it('should make a single request to db.find() with no constraints', function(done) {
            request(app)
                .get('/cinemas')
                .end(function(err) {
                    expect(findCinemas).to.be.calledOnce;
                    expect(findCinemas.getCall(0).args).to.have.length(1);
                    expect(findCinemas.getCall(0).args[0]).to.be.a('function');
                    done(err);
                });
        });

        it('should return the list of cinemas retrieved from the db', function(done) {
            var cinemas = [{id:1}, {id:2}, {id:3}];
            findCinemas.callbackArguments = [[null, cinemas]];

            request(app)
                .get('/cinemas')
                .end(function(err, res) {
                    expect(res.body.data.cinemas).to.deep.equal(cinemas);
                    done(err);
                });
        });

    });

});
