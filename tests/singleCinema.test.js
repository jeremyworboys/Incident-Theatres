/**
 * Single Cinema Test
 * @copyright 2013 Jeremy Worboys
 */

var chai = require('chai');
var request = require('supertest');
var expect = chai.expect;

var app = require('../app');

describe('Single Cinema', function() {

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
                    expect(res.body.data).to.exist;
                    expect(res.body.data).to.be.a('object');
                    expect(res.body.data.cinema).to.exist;
                    expect(res.body.data.cinema).to.be.a('object');
                    done(err);
                });
        });

        it('should return the cinema retrieved from the db', function(done) {
            request(app)
                .get('/cinema/1')
                .end(function(err, res) {
                    expect(res.body.data.cinema.id).to.equal(1);
                    expect(res.body.data.cinema.name).to.equal('Greater Union');
                    expect(res.body.data.cinema.suburb).to.equal('Manuka');
                    done(err);
                });
        });

        it('should return a 404 error if the id doesn\'t exist', function(done) {
            request(app)
                .get('/cinema/10000')
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
