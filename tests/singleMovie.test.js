/**
 * Single Movie Test
 * @copyright 2013 Jeremy Worboys
 */

var chai = require('chai');
var request = require('supertest');
var sinon = require('sinon');
var expect = chai.expect;

chai.use(require('sinon-chai'));

var app = require('../app');

describe('Single Movie', function() {
    var getMovie;

    beforeEach(function() {
        getMovie = sinon.spy(app.models.movie, 'get');
    });

    afterEach(function() {
        getMovie.restore();
    });

    describe('/movie/:id', function() {

        it('should return json', function(done) {
            request(app)
                .get('/movie/1')
                .expect('content-type', /json/)
                .expect(200, done);
        });

        it('should follow jsend spec', function(done) {
            request(app)
                .get('/movie/1')
                .end(function(err, res) {
                    expect(res.body.status).to.equal('success');
                    expect(res.body.data).to.exist;
                    expect(res.body.data).to.be.a('object');
                    expect(res.body.data.movie).to.exist;
                    expect(res.body.data.movie).to.be.a('object');
                    done(err);
                });
        });

        it('should make a single request to db.get() with the movie id', function(done) {
            request(app)
                .get('/movie/1')
                .end(function(err) {
                    expect(getMovie).to.be.calledOnce;
                    expect(getMovie.getCall(0).args).to.have.length(2);
                    expect(getMovie.getCall(0).args[0]).to.equal('1');
                    expect(getMovie.getCall(0).args[1]).to.be.a('function');
                    done(err);
                });
        });

        it('should return the movie retrieved from the db', function(done) {
            request(app)
                .get('/movie/1')
                .end(function(err, res) {
                    expect(res.body.data.movie.id).to.equal(1);
                    expect(res.body.data.movie.title).to.equal('2 Guns');
                    expect(res.body.data.movie.runtime).to.equal(109);
                    done(err);
                });
        });

        it('should return a 404 error if the id doesn\'t exist', function(done) {
            request(app)
                .get('/movie/10000')
                .expect(404)
                .end(function(err, res) {
                    expect(res.body.status).to.equal('error');
                    expect(res.body.code).to.equal(404);
                    expect(res.body.message).to.equal('Not found');
                    expect(res.body.data).to.not.exist;
                    done(err);
                });
        });

    });

});