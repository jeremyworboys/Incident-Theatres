/**
 * Cinemas Controller
 * Defines cinema related route endpoints
 * @copyright 2013 Jeremy Worboys
 */

var cinemas = {};

/**
 * List cinemas
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {Function} next
 */
cinemas.list = function listCinemas(req, res, next) {
    req.models.cinema.query(req.query, function(err, cinemas) {
        if (err) return next(err);

        res.json({
            status: 'success',
            data: { cinemas: cinemas }
        });
    });
};

/**
 * Single cinema
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {Function} next
 */
cinemas.single = function singleCinema(req, res, next) {
    req.models.cinema.get(req.params.id, function(err, cinema) {
        if (err) return next(err);

        res.json({
            status: 'success',
            data: { cinema: cinema }
        });
    });
};

/**
 * List cinema movies
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {Function} next
 */
cinemas.listMovies = function listCinemaMovies(req, res, next) {
    req.models.cinema.get(req.params.id, function(err, cinema) {
        if (err) return next(err);

        cinema.getMovies(function(err, movies) {
            if (err) return next(err);

            res.json({
                status: 'success',
                data: { movies: movies }
            });
        });
    });
};


module.exports = cinemas;
