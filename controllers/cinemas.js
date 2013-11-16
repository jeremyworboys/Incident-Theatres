/**
 * Cinemas Controller
 * @copyright 2013 Jeremy Worboys
 */

var cinemas = {};

cinemas.list = function listCinemas(req, res) {
    var data = {
        status: 'success',
        cinemas: []
    };

    res.json(data);
};


module.exports = cinemas;
