/**
 * Cinemas Controller
 * Defines cinema related route endpoints
 * @copyright 2013 Jeremy Worboys
 */

var cinemas = {};

cinemas.list = function listCinemas(req, res, next) {
    req.models.cinema.find(function(err, cinemas) {
        if (err) return next(err);

        res.json({
            status: 'success',
            data: { cinemas: cinemas }
        });
    });
};

cinemas.single = function singleCinema(req, res, next) {
    req.models.cinema.get(req.params.id, function(err, cinema) {
        if (err) return next(err);

        res.json({
            status: 'success',
            data: { cinema: cinema }
        });
    });
};


module.exports = cinemas;
