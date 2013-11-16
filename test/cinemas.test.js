/**
 * Acceptance Tests
 * @copyright 2013 Jeremy Worboys
 */

var chai = require('chai');
var request = require('supertest');
var expect = chai.expect;

var app = require('../');


describe('Incident Theatres', function() {

    describe('/cinemas', function() {

        it('should return a return a valid jsend response', function(done) {
            request(app)
                .get('/cinemas')
                .expect(200)
                .expect('content-type', /json/)
                .end(function(err, res) {
                    expect(res.body.status).to.equal('success');
                    expect(res.body.cinemas).to.exist;
                    done(err);
                });
        });

    });

});