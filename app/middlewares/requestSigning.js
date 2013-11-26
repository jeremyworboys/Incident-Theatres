/**
 * Request Signing
 * Validates the incoming request
 * @copyright 2013 Jeremy Worboys
 */

var crypto = require('crypto');

var unauthorised = function(msg) {
    var err = new Error(msg);
    err.code = 401;
    return err;
};

var badRequest = function(msg) {
    var err = new Error(msg);
    err.code = 400;
    return err;
};

module.exports = function(app) {

    var requestSigning = function(req, res, next) {
        if (app.disabled('signed_requests')) return next();

        var accessToken, requestSignature, requestTimestamp;

        // Get access token
        if (!(accessToken = req.headers['x-access-token'])) {
            return next(unauthorised('Access token is missing'));
        }

        var conds = { 'access_token': accessToken };
        req.models.apiClient.find(conds, function(err, client) {
            if (err) return next(err);

            // Is valid access token?
            if (client.length !== 1) {
                return next(unauthorised('Access token is invalid'));
            }
            client = client[0];

            // Get request signature
            if (!(requestSignature = req.headers['x-request-signature'])) {
                return next(badRequest('Request signature is missing'));
            }

            // Get request timestamp
            if (!(requestTimestamp = req.headers['x-request-timestamp'])) {
                return next(badRequest('Request timestamp is missing'));
            }

            // Is timestamp within 5 seconds of current time?
            // This reduces replay attacks while allowing a slight margin for
            // synchronisation discrepancies and latency
            var time = Math.round(Date.now() / 1000); // convert to seconds

            if (requestTimestamp < (time - 5) || requestTimestamp > (time + 5)) {
                return next(badRequest('Request timestamp is invalid'));
            }

            // Is the request signature accurate
            var hash = crypto.createHash('sha1');
            hash.update(req.originalUrl + requestTimestamp + client['shared_secret']);

            if (requestSignature !== hash.digest('hex')) {
                return next(badRequest('Request signature is invalid'));
            }

            // All good
            next();
        });
    };

    return requestSigning;

};
