var app = require('../express');

// var mongoose = require('mongoose');
// mongoose.Promise = require('q').Promise;
// mongoose.connect('mongodb://localhost/webdev_2017');

var connectionString = 'mongodb://127.0.0.1:27017/project';

if(process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

var mongoose = require("mongoose");
mongoose.createConnection(connectionString);
mongoose.Promise = require('q').Promise;

require('./services/user.service.server');
require('./services/review.service.server');

