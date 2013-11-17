/**
 * List Movies Test
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

describe('List Movies', function() {
    var findMovies;

    beforeEach(function() {
        findMovies = fakes.stub(app.models.movie, 'find').yields(null, []);
    });

    afterEach(function() {
        fakes.restore();
    });

    describe('/movies', function() {

        it('should return json', function(done) {
            request(app)
                .get('/movies')
                .expect('content-type', /json/)
                .expect(200, done);
        });

        it('should follow jsend spec', function(done) {
            request(app)
                .get('/movies')
                .end(function(err, res) {
                    expect(res.body.status).to.equal('success');
                    expect(res.body.data).to.exist;
                    expect(res.body.data).to.be.a('object');
                    expect(res.body.data.movies).to.exist;
                    expect(res.body.data.movies).to.be.a('array');
                    done(err);
                });
        });

        it('should make a single request to db.find() with no constraints', function(done) {
            request(app)
                .get('/movies')
                .end(function(err) {
                    expect(findMovies).to.be.calledOnce;
                    expect(findMovies.getCall(0).args).to.have.length(1);
                    expect(findMovies.getCall(0).args[0]).to.be.a('function');
                    done(err);
                });
        });

        it('should return the list of movies retrieved from the db', function(done) {
            var movies = [{id:1}, {id:2}, {id:3}];
            findMovies.callbackArguments = [[null, movies]];

            request(app)
                .get('/movies')
                .end(function(err, res) {
                    expect(res.body.data.movies).to.deep.equal(movies);
                    done(err);
                });
        });

    });

});
