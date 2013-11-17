
var db = require('mysql').createConnection(require('../config/database'));

exports.up = function(next){
    db.connect(function(err) {
        if (err) return next(err);

        db.query([
            'CREATE TABLE `movies` (',
            '    `id`             int(10) unsigned NOT NULL AUTO_INCREMENT,',
            '    `title`          varchar(255) NOT NULL,',
            '    `coverurl`       varchar(255) NOT NULL,',
            '    `classification` ENUM("CTC", "G", "PG", "M", "MA15+", "R18+") NOT NULL,',
            '    `runtime`        smallint(5) unsigned NOT NULL,',
            '    `synopsis`       text NOT NULL,',
            '    `director`       varchar(255) NOT NULL,',
            '    PRIMARY KEY (`id`)',
            ') ENGINE=InnoDB CHARSET=utf8;'
        ].join('\n'));

        db.end(next);
    });
};

exports.down = function(next){
    db.connect(function(err) {
        if (err) return next(err);

        db.query('DROP TABLE `movies`;');

        db.end(next);
    });
};
