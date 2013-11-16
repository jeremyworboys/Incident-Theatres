/**
 * Cinemas Controller
 * Defines cinema related route endpoints
 * @copyright 2013 Jeremy Worboys
 */

var cinemas = {};

cinemas.list = function listCinemas(req, res) {
    res.json({
        status: 'success',
        cinemas: []
    });
};

cinemas.single = function singleCinema(req, res) {
    res.json({
        status: 'success',
        cinema: {}
    });
};


module.exports = cinemas;
