/**
 * List Movies Test
 * @copyright 2013 Jeremy Worboys
 */

var chai = require('chai');
var request = require('supertest');
var expect = chai.expect;

var app = require('../app');

describe('List Movies', function() {

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

        it('should allow searching by title', function(done) {
            request(app)
                .get('/movies?title=one')
                .end(function(err, res) {
                    expect(res.body.data.movies).to.have.length(2);
                    res.body.data.movies.forEach(function(movie) {
                        expect(movie.title.toLowerCase()).to.contain('one');
                    });
                    done(err);
                });
        });

        it('should allow searching by multiple columns', function(done) {
            request(app)
                .get('/movies?title=the&classification=m')
                .end(function(err, res) {
                    expect(res.body.data.movies).to.have.length(6);
                    res.body.data.movies.forEach(function(movie) {
                        expect(movie.title.toLowerCase()).to.contain('the');
                        expect(movie.classification).to.equal('M');
                    });
                    done(err);
                });
        });

        it('should ignore searches for non-searchable columns', function(done) {
            request(app)
                .get('/movies?coverurl=//cdn.eventcinemas.com.au/resources/movies/6213/images/movie.jpg')
                .end(function(err, res) {
                    expect(res.body.data.movies).to.have.length(29);
                    done(err);
                });
        });

        it('should allow searching min-runtime', function(done) {
            request(app)
                .get('/movies?min-runtime=120')
                .end(function(err, res) {
                    expect(res.body.data.movies).to.have.length(14);
                    done(err);
                });
        });

        it('should allow searching max-runtime', function(done) {
            request(app)
                .get('/movies?max-runtime=120')
                .end(function(err, res) {
                    expect(res.body.data.movies).to.have.length(15);
                    done(err);
                });
        });

        it('should allow searching with both min- and max-runtime', function(done) {
            request(app)
                .get('/movies?min-runtime=100&max-runtime=120')
                .end(function(err, res) {
                    expect(res.body.data.movies).to.have.length(8);
                    done(err);
                });
        });

    });

});
