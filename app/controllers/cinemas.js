/**
 * Cinemas Controller
 * Defines cinema related route endpoints
 * @copyright 2013 Jeremy Worboys
 */

var cinemas = {};

cinemas.list = function listCinemas(req, res) {
    req.models.cinema.find(function(err, cinemas) {
        res.json({
            status: 'success',
            cinemas: cinemas
        });
    });
};

cinemas.single = function singleCinema(req, res) {
    res.json({
        status: 'success',
        cinema: {}
    });
};


module.exports = cinemas;
