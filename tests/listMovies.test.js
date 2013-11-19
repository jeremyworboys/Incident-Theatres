/**
 * List Movies Test
 * @copyright 2013 Jeremy Worboys
 */

var chai = require('chai');
var request = require('supertest');
var sinon = require('sinon');
var expect = chai.expect;

chai.use(require('sinon-chai'));

var app = require('../app');

describe('List Movies', function() {
    var findMovies;

    beforeEach(function() {
        findMovies = sinon.spy(app.models.movie, 'find');
    });

    afterEach(function() {
        findMovies.restore();
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
            request(app)
                .get('/movies')
                .end(function(err, res) {
                    expect(res.body.data.movies).to.have.length(29);
                    expect(res.body.data.movies[0].id).to.equal(1);
                    expect(res.body.data.movies[0].title).to.equal('2 Guns');
                    expect(res.body.data.movies[0].runtime).to.equal(109);
                    done(err);
                });
        });

    });

});
