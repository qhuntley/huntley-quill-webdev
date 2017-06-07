var app = require('../../express');

app.get('/api/user', findUserByCredentials);
app.get('/api/user/:userId', findUserById);
app.post('/api/user', createUser);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);
app.get('/api/user?username=username', findUserByUsername);


var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

function deleteUser(req, res) {
    var userId = req.params.userId;
    var user = users.find(function (user) {
        return user._id === userId;
    });
    var index = users.indexOf(user);
    users.splice(index, 1);
    res.sendStatus(200);
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    for(var u in users) {
        if(userId === users[u]._id) {
            users[u] = user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

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
    res.json(user);
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    for (var u in users) {
        var user = users[u];
        if (user.username === username &&
            user.password === password) {
            res.json(user);
            return;
        }
        if (typeof password === 'undefined') {
            return findUserByUsername(res, username);
        }
    }
    res.sendStatus(404);
}

function findUserByUsername(res, username) {
    var user = users.find(function (user) {
        return user.username === username;
    });
    if (typeof user === 'undefined') {
        res.sendStatus(404);
    }
    else {
        res.send(user);
    }
}
