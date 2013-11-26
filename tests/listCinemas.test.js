/**
 * List Cinemas Test
 * @copyright 2013 Jeremy Worboys
 */

var chai = require('chai');
var request = require('supertest');
var expect = chai.expect;

var app = require('../app');

describe('List Cinemas', function() {

    describe('/cinemas', function() {

        beforeEach(function() {
            // Disable request signing while running tests
            app.disable('signed_requests');
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

        it('should allow searching by name', function(done) {
            request(app)
                .get('/cinemas?name=Incident')
                .end(function(err, res) {
                    expect(res.body.data.cinemas).to.have.length(28);
                    res.body.data.cinemas.forEach(function(cinema) {
                        expect(cinema.name).to.contain('Incident');
                    });
                    done(err);
                });
        });

        it('should allow searching by multiple columns', function(done) {
            request(app)
                .get('/cinemas?name=incident&state=nsw')
                .end(function(err, res) {
                    expect(res.body.data.cinemas).to.have.length(14);
                    res.body.data.cinemas.forEach(function(cinema) {
                        expect(cinema.name).to.contain('Incident');
                        expect(cinema.state).to.contain('NSW');
                    });
                    done(err);
                });
        });

        it('should ignore searches for non-searchable columns', function(done) {
            request(app)
                .get('/cinemas?street1=street')
                .end(function(err, res) {
                    expect(res.body.data.cinemas).to.have.length(60);
                    done(err);
                });
        });

        it('should not fuzzy search states', function(done) {
            request(app)
                .get('/cinemas?state=w')
                .end(function(err, res) {
                    expect(res.body.data.cinemas).to.have.length(0);
                    done(err);
                });
        });

        it('should not fuzzy search postcodes', function(done) {
            request(app)
                .get('/cinemas?postcode=20')
                .end(function(err, res) {
                    expect(res.body.data.cinemas).to.have.length(0);
                    done(err);
                });
        });

        it('should allow searching by latitude and longitude', function(done) {
            request(app)
                .get('/cinemas?ll=-33.867387,151.207629&radius=20')
                .end(function(err, res) {
                    expect(res.body.data.cinemas).to.have.length(9);
                    res.body.data.cinemas.forEach(function(cinema) {
                        expect(cinema.distance).to.be.below(20);
                    });
                    done(err);
                });
        });

        it('should ordered latitude and longitude results by distance', function(done) {
            request(app)
                .get('/cinemas?ll=-33.867387,151.207629&radius=20')
                .end(function(err, res) {
                    var dist = 0;
                    res.body.data.cinemas.forEach(function(cinema) {
                        expect(cinema.distance).to.be.above(dist);
                        dist = cinema.distance;
                    });
                    done(err);
                });
        });

    });

});
