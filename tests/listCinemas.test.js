/**
 * List Cinemas Test
 * @copyright 2013 Jeremy Worboys
 */

var chai = require('chai');
var request = require('supertest');
var sinon = require('sinon');
var expect = chai.expect;

chai.use(require('sinon-chai'));

var app = require('../app');

describe('List Cinemas', function() {
    var findCinemas;

    beforeEach(function() {
        findCinemas = sinon.spy(app.models.cinema, 'find');
    });

    afterEach(function() {
        findCinemas.restore();
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
            request(app)
                .get('/cinemas')
                .end(function(err, res) {
                    expect(res.body.data.cinemas).to.have.length(60);
                    expect(res.body.data.cinemas[0].id).to.equal(1);
                    expect(res.body.data.cinemas[0].name).to.equal('Greater Union');
                    expect(res.body.data.cinemas[0].suburb).to.equal('Manuka');
                    done(err);
                });
        });

    });

});
