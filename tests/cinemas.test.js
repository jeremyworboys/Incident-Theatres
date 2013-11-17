/**
 * Acceptance Tests
 * @copyright 2013 Jeremy Worboys
 */

var chai = require('chai');
var request = require('supertest');
var expect = chai.expect;

var app = require('../app');


describe('Incident Theatres', function() {

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
                    expect(res.body.cinemas).to.exist;
                    expect(res.body.cinemas).to.be.a('array');
                    done(err);
                });
        });

    });

    describe('/cinema/:id', function() {

        it('should return json', function(done) {
            request(app)
                .get('/cinema/1')
                .expect('content-type', /json/)
                .expect(200, done);
        });

        it('should follow jsend spec', function(done) {
            request(app)
                .get('/cinema/1')
                .end(function(err, res) {
                    expect(res.body.status).to.equal('success');
                    expect(res.body.cinema).to.exist;
                    expect(res.body.cinema).to.be.a('object');
                    done(err);
                });
        });

    });

});
