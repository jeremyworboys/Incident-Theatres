/**
 * Application Routes
 * Define all application routes
 * @copyright 2013 Jeremy Worboys
 */

var loadModels = require('../middlewares/modelLoader');
var enforceSigning = require('../middlewares/requestSigning');
var cinemas = require('../controllers/cinemas');
var movies = require('../controllers/movies');


module.exports = function(app) {

    app.get('/cinemas',           loadModels, enforceSigning(app), cinemas.list);
    app.get('/cinema/:id',        loadModels, enforceSigning(app), cinemas.single);
    app.get('/cinema/:id/movies', loadModels, enforceSigning(app), cinemas.listMovies);

    app.get('/movies',            loadModels, enforceSigning(app), movies.list);
    app.get('/movie/:id',         loadModels, enforceSigning(app), movies.single);
    app.get('/movie/:id/cinemas', loadModels, enforceSigning(app), movies.listCinemas);

};
