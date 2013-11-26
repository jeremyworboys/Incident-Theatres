/**
 * List Movie Cinemas Test
 * @copyright 2013 Jeremy Worboys
 */

var chai = require('chai');
var request = require('supertest');
var expect = chai.expect;

var app = require('../app');

describe('List Movie Cinemas', function() {

    describe('/movie/:id/cinemas', function() {

        beforeEach(function() {
            // Disable request signing while running tests
            app.disable('signed_requests');
        });

        it('should return json', function(done) {
            request(app)
                .get('/movie/4/cinemas')
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
                .get('/movie/4/cinemas')
                .end(function(err, res) {
                    delete global.ii;
                    expect(res.body.status).to.equal('success');
                    expect(res.body.data).to.exist;
                    expect(res.body.data).to.be.a('object');
                    expect(res.body.data.cinemas).to.exist;
                    expect(res.body.data.cinemas).to.be.a('array');
                    done(err);
                });
        });

        it('should return the list of movies retrieved from the db', function(done) {
            request(app)
                .get('/movie/4/cinemas')
                .end(function(err, res) {
                    delete global.ii;
                    expect(res.body.data.cinemas).to.have.length(5);
                    expect(res.body.data.cinemas[0].id).to.equal(4);
                    expect(res.body.data.cinemas[1].id).to.equal(15);
                    expect(res.body.data.cinemas[2].id).to.equal(38);
                    expect(res.body.data.cinemas[3].id).to.equal(56);
                    expect(res.body.data.cinemas[4].id).to.equal(59);
                    done(err);
                });
        });

    });

});
