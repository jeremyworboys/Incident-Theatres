/**
 * Acceptance Tests
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

describe('Incident Theatres', function() {

    afterEach(function() {
        fakes.restore();
    });

    describe('/cinemas', function() {
        var findCinemas;

        beforeEach(function() {
            findCinemas = fakes.stub(app.models.cinema, 'find').yields(null, []);
        });

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
            var cinemas = [{id:1}, {id:2}, {id:3}];
            findCinemas.callbackArguments = [[null, cinemas]];

            request(app)
                .get('/cinemas')
                .end(function(err, res) {
                    expect(res.body.data.cinemas).to.deep.equal(cinemas);
                    done(err);
                });
        });

    });

    describe('/cinema/:id', function() {
        var getCinema;

        beforeEach(function() {
            getCinema = fakes.stub(app.models.cinema, 'get').yields(null, {});
        });

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

        it('should make a single request to db.get() with the cinema id', function(done) {
            request(app)
                .get('/cinema/1')
                .end(function(err) {
                    expect(getCinema).to.be.calledOnce;
                    expect(getCinema.getCall(0).args).to.have.length(2);
                    expect(getCinema.getCall(0).args[0]).to.equal('1');
                    expect(getCinema.getCall(0).args[1]).to.be.a('function');
                    done(err);
                });
        });

        it('should return the cinema retrieved from the db', function(done) {
            var cinema = {id:1};
            getCinema.callbackArguments = [[null, cinema]];

            request(app)
                .get('/cinema/1')
                .end(function(err, res) {
                    expect(res.body.data.cinema).to.deep.equal(cinema);
                    done(err);
                });
        });

    });

});
