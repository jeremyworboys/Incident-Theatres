
var db = require('mysql').createConnection(require('../config/database'));

exports.up = function(next){
    db.connect(function(err) {
        if (err) return next(err);

        db.query([
            'CREATE TABLE `cinemas` (',
            '    `id`         int(10) unsigned NOT NULL AUTO_INCREMENT,',
            '    `name`       varchar(255) NOT NULL,',
            '    `street1`    varchar(255) NOT NULL,',
            '    `street2`    varchar(255) NOT NULL,',
            '    `suburb`     varchar(255) NOT NULL,',
            '    `state`      varchar(255) NOT NULL,',
            '    `postcode`   varchar(255) NOT NULL,',
            '    `latitude`   decimal(11,8) NOT NULL,',
            '    `longitude`  decimal(11,8) NOT NULL,',
            '    PRIMARY KEY (`id`)',
            ') ENGINE=InnoDB CHARSET=utf8;'
        ].join('\n'));

        db.end(next);
    });
};

exports.down = function(next){
    db.connect(function(err) {
        if (err) return next(err);

        db.query('DROP TABLE `cinemas`;');

        db.end(next);
    });
};
