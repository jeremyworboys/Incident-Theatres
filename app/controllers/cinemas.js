/**
 * Cinemas Controller
 * Defines cinema related route endpoints
 * @copyright 2013 Jeremy Worboys
 */

var cinemas = {};
var ormErrors = require('orm/lib/ErrorCodes');

cinemas.list = function listCinemas(req, res) {
    req.models.cinema.find(function(err, cinemas) {
        res.json({
            status: 'success',
            data: {
                cinemas: cinemas
            }
        });
    });
};

cinemas.single = function singleCinema(req, res) {
    req.models.cinema.get(req.params.id, function(err, cinema) {
        var data = {};

        if (err && err.code === ormErrors.NOT_FOUND) {
            data.status = 'error';
            data.code = 404;
            data.message = err.message;
            res.status(404);
        }
        else {
            data.status = 'success';
            data.data = { cinema: cinema };
        }

        res.json(data);
    });
};


module.exports = cinemas;
