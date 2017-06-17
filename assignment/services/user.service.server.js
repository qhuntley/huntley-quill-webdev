var app = require('../../express');
var userModel = require('../model/user/user.model.server');
var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};

app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/#!/profile',
        failureRedirect: '/assignment/#!/login'
    }));

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);



app.get('/api/user', isAdmin, findAllUsers);
app.get('/api/user/:userId', findUserById);
app.post('/api/user', createUser);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', isAdmin, deleteUser);
app.delete('/api/unregister', unregister);

app.get('/api/user?username=username', findUserByUsername);
app.post('/api/login', passport.authenticate('local'), login);
app.get('/api/checkLoggedIn', checkLoggedIn);
app.post('/api/logout', logout);
app.post('/api/register', register);
app.get('/api/checkAdmin', checkAdmin);

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if(bcrypt.compareSync(password, user.password)) {
                return userModel
                    .findUserByCredentials(username, user.password)
                    .then(function(user) {
                            if (!user) {
                                return done(null, false);
                            }
                            return done(null, user);
                        },
                        function(err) {
                            if (err) {
                                return done(err);
                            }
                    });
            }
        });
}

function login(req, res) {

    var user = req.user;
    res.json(user);
}

function checkLoggedIn(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function checkAdmin(req, res) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    return userModel
            .createUser(user)
            .then(function (user) {
               req.login(user, function (status) {
                   res.json(user);
              });
        });
}

function unregister(req, res) {
    userModel
        .deleteUser(req.user._id)
        .then(function (status) {
            req.user.logout();
            res.sendStatus(200);
        }, function (err) {
            console.log(err);
        });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (){
            res.sendStatus(200);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });

}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    if(username && password) {
        return findUserByCredentials(req, res);
    }
    userModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        });
}

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    console.log([username, password]);
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user != null) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });
    /* for(var u in users) {
     var user = users[u];
     if( user.username === username &&
     user.password === password){
     res.json(user);
     return;
     }
     }*/
}

function findUserByUsername(res, username) {
    for(var u in users) {
        var user =  users[u];
        if( user.username === username) {
            res.json(user);
            return;
        }
    }
    res.sendStatus(404);
}


function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}


function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(function (user) {
            if (user) {
                return done(null, user);
            } else {
                var newUser = {
                    username: profile.displayName,
                    facebook: {
                        id: profile.id,
                        token: token
                    }
                };
                return userModel
                    .createUser(newUser)
                    .then(function (response) {
                        return done(null, response);
                    })
            }
        })
}