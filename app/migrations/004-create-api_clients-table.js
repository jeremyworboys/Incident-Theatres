
var db = require('mysql').createConnection(require('../config/database'));

exports.up = function(next){
    db.connect(function(err) {
        if (err) return next(err);

        db.query([
            'CREATE TABLE `api_clients` (',
            '    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,',
            '    `name` varchar(128) DEFAULT NULL,',
            '    `access_token` varchar(40) DEFAULT NULL,',
            '    `shared_secret` varchar(40) DEFAULT NULL,',
            '    PRIMARY KEY (`id`),',
            '    UNIQUE KEY `access_token` (`access_token`)',
            ') ENGINE=InnoDB CHARSET=utf8;'
        ].join('\n'));

        db.end(next);
    });
};

exports.down = function(next){
    db.connect(function(err) {
        if (err) return next(err);

        db.query('DROP TABLE `api_clients`;');

        db.end(next);
    });
};
