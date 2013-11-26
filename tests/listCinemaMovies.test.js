/**
 * List Cinema Movies Test
 * @copyright 2013 Jeremy Worboys
 */

var chai = require('chai');
var request = require('supertest');
var expect = chai.expect;

var app = require('../app');

describe('List Cinema Movies', function() {

    describe('/cinema/:id/movies', function() {

        beforeEach(function() {
            // Disable request signing while running tests
            app.disable('signed_requests');
        });

        it('should return json', function(done) {
            request(app)
                .get('/cinema/1/movies')
                .expect('content-type', /json/)
                .expect(200)
                .end(function(err) {
                    // This global is defined in sql-query@0.1.15
                    // I have submitted a pull request to the developer which
                    // can be found at: https://github.com/dresende/node-sql-query/pull/27
                    delete global.ii;
                    done(err);
                });
        });

        it('should follow jsend spec', function(done) {
            request(app)
                .get('/cinema/1/movies')
                .end(function(err, res) {
                    delete global.ii;
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
                .get('/cinema/1/movies')
                .end(function(err, res) {
                    delete global.ii;
                    expect(res.body.data.movies).to.have.length(7);
                    expect(res.body.data.movies[0].id).to.equal(2);
                    expect(res.body.data.movies[1].id).to.equal(5);
                    expect(res.body.data.movies[2].id).to.equal(7);
                    expect(res.body.data.movies[3].id).to.equal(18);
                    expect(res.body.data.movies[4].id).to.equal(20);
                    expect(res.body.data.movies[5].id).to.equal(22);
                    expect(res.body.data.movies[6].id).to.equal(25);
                    done(err);
                });
        });

    });

});
