/**
 * Request Signing Test
 * @copyright 2013 Jeremy Worboys
 */

var crypto = require('crypto');
var request = require('supertest');

var app = require('../app');

describe('Request Signing', function() {

    it('should fail without an access token', function(done) {
        app.enable('signed_requests');

        request(app)
            .get('/cinemas')
            .expect(401, done);
    });

    it('should fail with an incorrect access token', function(done) {
        app.enable('signed_requests');

        request(app)
            .get('/cinemas')
            .set('X-Access-Token', 'doesnotexist')
            .expect(401, done);
    });

    it('should fail with a correct access token but no signature', function(done) {
        app.enable('signed_requests');

        request(app)
            .get('/cinemas')
            .set('X-Access-Token', '9dda6457c39160880a27ebe59c9f6dbc1cbbea0b')
            .expect(400, done);
    });

    it('should fail with an old timestamp', function(done) {
        app.enable('signed_requests');

        var time = Math.round(Date.now() / 1000) - 20000; // convert to seconds
        var hash = crypto.createHash('sha1');
        hash.update('/cinemas' + time + 'da892178b2f41320af3d6a072740a3d5b8731eb0');

        request(app)
            .get('/cinemas')
            .set('X-Access-Token', '9dda6457c39160880a27ebe59c9f6dbc1cbbea0b')
            .set('X-Request-Signature', hash.digest('hex'))
            .set('X-Request-Timestamp', time)
            .expect(400, done);
    });

    it('should success with a correct access token and a correct signature', function(done) {
        app.enable('signed_requests');

        var time = Math.round(Date.now() / 1000); // convert to seconds
        var hash = crypto.createHash('sha1');
        hash.update('/cinemas' + time + 'da892178b2f41320af3d6a072740a3d5b8731eb0');

        request(app)
            .get('/cinemas')
            .set('X-Access-Token', '9dda6457c39160880a27ebe59c9f6dbc1cbbea0b')
            .set('X-Request-Signature', hash.digest('hex'))
            .set('X-Request-Timestamp', time)
            .expect(200, done);
    });

});
