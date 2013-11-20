
var db = require('mysql').createConnection(require('../config/database'));

exports.up = function(next){
    db.connect(function(err) {
        if (err) return next(err);

        db.query([
            'CREATE TABLE `cinemas_movies` (',
            '    `cinemas_id` int(10) unsigned NOT NULL,',
            '    `movies_id`  int(10) unsigned NOT NULL,',
            '    UNIQUE KEY `cinemas_id_movies_id` (`cinemas_id`,`movies_id`),',
            '    KEY `cinema_movies_cinema_fk` (`cinemas_id`),',
            '    KEY `cinema_movies_movie_fk` (`movies_id`),',
            '    CONSTRAINT `cinema_movies_cinema_fk` FOREIGN KEY (`cinemas_id`) REFERENCES `cinemas` (`id`),',
            '    CONSTRAINT `cinema_movies_movie_fk` FOREIGN KEY (`movies_id`) REFERENCES `movies` (`id`)',
            ') ENGINE=InnoDB CHARSET=utf8;'
        ].join('\n'));

        db.end(next);
    });
};

exports.down = function(next){
    db.connect(function(err) {
        if (err) return next(err);

        db.query('DROP TABLE `cinemas_movies`;');

        db.end(next);
    });
};
