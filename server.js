var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: "put some text here" }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/session', function (req, res) {
    console.log(req.session);
    res.send(req.session);
});

app.get('/api/session/:name/:value', function (req, res) {
    var name = req.params.name;
    var value = req.params.value;

    var obj = {
        name: value
    };
    req.session[name] = obj;

    console.log(req.session);
    res.send(req.session);
});
// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var port = process.env.PORT || 3000;

require("./assignment/app.js");
require("./project/app.js");



app.listen(port);