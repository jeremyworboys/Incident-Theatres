/**
 * Movie Model
 * Interacts with the database to retrieve movie data
 * @copyright 2013 Jeremy Worboys
 */

var orm = require('orm');


/**
 * Define movie model
 * @param  {Connection} db
 * @return {Model}
 */
module.exports.define = function(db) {

    var Movie = db.define('movie', {
        title:          String,
        classification: { type: 'enum', values: ['CTC', 'G', 'PG', 'M', 'MA15+', 'R18+'] },
        coverurl:       String,
        synopsis:       String,
        runtime:        Number,
        director:       String
    }, {
        table: 'movies'
    });

    /**
     * Perform conditional search
     * @param  {Object}   query
     * @param  {Function} cb
     */
    Movie.query = function(query, cb) {
        var conds = {};
        var runtime = {};
        for (var key in query) {
            switch (key) {
            case 'title':
            case 'synopsis':
            case 'director':
                conds[key] = orm.like('%' + query[key] + '%');
                break;

            case 'classification':
                conds[key] = query[key].toUpperCase();
                break;

            case 'min-runtime':
                if (runtime['max']) {
                    conds['runtime'] = orm.between(query[key], runtime['max']);
                } else {
                    conds['runtime'] = orm.gte(query[key]);
                }
                runtime['min'] = query[key];
                break;

            case 'max-runtime':
                if (runtime['min']) {
                    conds['runtime'] = orm.between(runtime['min'], query[key]);
                } else {
                    conds['runtime'] = orm.lte(query[key]);
                }
                runtime['max'] = query[key];
                break;
            }
        }

        Movie.find(conds, cb);
    };

    return Movie;

};

/**
 * Create model associations
 * @param  {Connection} db
 */
module.exports.associations = function(db) {

    db.models.movie.hasMany('cinemas', db.models.cinema, {}, { mergeTable: 'cinemas_movies' });

};
