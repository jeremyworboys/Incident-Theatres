/**
 * Error Handler
 * Format errors for HTTP response
 * @copyright 2013 Jeremy Worboys
 */

var ormErrors = require('orm/lib/ErrorCodes');


module.exports = function(err, req, res, next) {
    // This is here so JSHint doesn't go off about `next` being defined but not
    // used, we can't remove it from the args though since Express uses
    // `Function.length` internally to determine that the this is an error
    // handling middleware
    if (!err) return next();

    // Coerce ORM error codes to HTTP error codes
    switch (err.code) {
    case ormErrors.NOT_FOUND:
        err.code = 404;
        break;
    }
    err.code = err.code || 500;

    res.status(err.code);
    res.json({
        status:  'error',
        code:    err.code,
        message: err.message
    });
};
