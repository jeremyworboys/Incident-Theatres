/**
 * Cinema Model
 * Interacts with the database to retrieve cinema data
 * @copyright 2013 Jeremy Worboys
 */

var orm = require('orm');


module.exports.define = function(db) {

    var Cinema = db.define('cinema', {
        name:      String,
        street1:   String,
        street2:   String,
        suburb:    String,
        state:     String,
        postcode:  String,
        latitude:  String,
        longitude: String
    }, {
        table: 'cinemas'
    });

    Cinema.query = function(query, cb) {
        var conds = {};
        for (var key in query) {
            switch (key) {
            case 'name':
            case 'suburb':
                conds[key] = orm.like('%' + query[key] + '%');
                break;

            case 'state':
                conds[key] = query[key].toUpperCase();
                break;

            case 'postcode':
                conds[key] = query[key];
                break;
            }
        }

        Cinema.find(conds, cb);
    };

    return Cinema;

};

module.exports.associations = function(db) {

    db.models.cinema.hasMany('movies', db.models.movie, {}, { mergeTable: 'cinemas_movies' });

};

