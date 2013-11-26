/**
 * Application Config
 * Configuration settings to be applied to the Express application
 * @copyright 2013 Jeremy Worboys
 */

var express = require('express');


module.exports = function(app) {

    app.set('port', 3000);

    switch (app.get('env')) {
    case 'development':
        app.use(express.logger('dev'));
    }

};
