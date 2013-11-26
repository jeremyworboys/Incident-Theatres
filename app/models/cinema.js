/**
 * Cinema Model
 * Interacts with the database to retrieve cinema data
 * @copyright 2013 Jeremy Worboys
 */

var orm = require('orm');


/**
 * Define cinema model
 * @param  {Connection} db
 * @return {Model}
 */
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

    /**
     * Proxy search query
     * @param  {Object}   query
     * @param  {Function} cb
     */
    Cinema.query = function(query, cb) {
        // Geo queries ignore other params
        if (query['ll']) {
            return Cinema._queryGeo(query, cb);
        }

        Cinema._queryConds(query, cb);
    };

    /**
     * Perform lat/lng search
     * @param  {Object}   query
     * @param  {Function} cb
     */
    Cinema._queryGeo = function(query, cb) {
        var ll = query.ll.split(',');
        var lat = parseFloat(ll[0], 10) || false;
        var lng = parseFloat(ll[1], 10) || false;
        var radius = parseFloat(query.radius, 10) || 20;
        var conn = db.driver.db;

        if (lat === false || lng === false) {
            var err = new Error('`ll` query param must contain two numeric values separated by a comma');
            err.code = 400; // HTTP Bad Request
            return cb(err);
        }

        // This unruly mess of SQL is the Haversine Formula, it is used to
        // determine the distance between two points on a sphere (Earth)
        var haversine = '(6371 * acos(cos(radians(?)) * cos(radians(??)) * cos(radians(??) - radians(?)) + sin(radians(?)) * sin(radians(??))))';

        var sql = 'SELECT *, ' + haversine + ' AS ?? FROM ?? HAVING ?? < ? ORDER BY ??';
        var props = [lat, 'latitude', 'longitude', lng, lat, 'latitude', 'distance', 'cinemas', 'distance', radius, 'distance'];

        conn.query(sql, props, cb);
    };

    /**
     * Perform conditional search
     * @param  {Object}   query
     * @param  {Function} cb
     */
    Cinema._queryConds = function(query, cb) {
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

/**
 * Create model associations
 * @param  {Connection} db
 */
module.exports.associations = function(db) {

    db.models.cinema.hasMany('movies', db.models.movie, {}, { mergeTable: 'cinemas_movies' });

};

