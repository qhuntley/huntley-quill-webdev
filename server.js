var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var port = process.env.PORT || 3000;

require('./assignment/services/user.service.server');



// USERS
app.get('/api/assignment/user', findUserByCredentials);
app.get('/api/assignment/user/:userId', findUserById);
app.post('/api/assignment/user', createUser);



var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

function createUser(req, res) {
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    users.push(user);
    res.send(user);
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    var user = users.find(function (user) {
        return user._id === userId;
    });
    res.send(user);
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    for(var u in users) {
        var user = users[u];
        if (user.username === username &&
            user.password === password) {
            res.json(user);
            return;
        }
    }
    res.sendStatus(404);
}


// WEBSITES

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];



app.listen(port);