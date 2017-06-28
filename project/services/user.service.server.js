var app = require('../../express');
var userProjectModel = require('../model/user/user.model.server');
var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");

var LocalStrategy1 = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new LocalStrategy1(localStrategy1));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/api/project/login', passport.authenticate('local') , login);
app.get('/api/project/checkLoggedIn', checkLoggedIn);
app.post('/api/project/register', register);
app.post('/api/project/logout', logout);
app.get('/api/project/checkAdmin', checkAdmin);
app.post('/api/project/follow', followUser);
app.post('/api/project/unfollow', unfollowUser);
app.get('api/project/user/:userId/followers', findFollowersById);
app.post('/api/project/user/:userId/updatePassword', updatePassword);

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};

app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/index.html#!/profile',
        failureRedirect: '/project/index.html#!/login'
    }));

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));



var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/index.html#!/profile',
        failureRedirect: '/project/index.html#!/login'
    }));

passport.use(new GoogleStrategy(googleConfig, googleStrategy));

app.get('/api/project/user/:userId', findUserById);
// findUserByCredentials and findUserByUsername are combined
// as a single function findUser since they have the same URL pattern
//app.get('/api/project/user', isAdmin, findUser);
app.get('/api/project/user', isAdmin, findAllUsers);
app.post('/api/project/user', isAdmin, createUser);
app.put('/api/project/user/:userId', updateUser);
app.delete('/api/project/user/:userId', isAdmin, deleteUser);
//app.delete('/api/project/unregister', unregister);
app.post('/api/project/unregister', unregister);

function localStrategy1(username, password, done) {
    userProjectModel
        .findUserByUsername(username)
        .then(function (user) {
            if (bcrypt.compareSync(password, user.password)) {
                return userProjectModel
                    .findUserByCredentials(username, user.password)
                    .then(function (user) {
                        console.log(user);
                        if (user) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    });
            }
        });
}

function facebookStrategy(token, refreshToken, profile, done) {
    userProjectModel
        .findUserByFacebookId(profile.id)
        .then(function (user) {
            if (!user) {

                var newUser = {
                    username: profile.displayName,
                    facebook: {
                        id: profile.id,
                        token: token
                    }
                };

                return userProjectModel
                    .createUser(newUser)
                    .then(function (response) {
                        return done(null, response);
                    })
            } else {
                console.log(profile);
                return userProjectModel
                    .updateFacebookToken(user._id, profile.id, token)
                    .then(function (response) {
                        return done(null, user);
                    })
            }
        })
}


function googleStrategy(token, refreshToken, profile, done) {
    userProjectModel
        .findUserByGoogleId(profile.id)
        .then(function (user) {
            if (user) {
                return done(null, user);
            } else {
                var email = profile.emails[0].value;
                var emailParts = email.split("@");
                var newUser = {
                    username: emailParts[0],
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    password: bcrypt.hashSync("password"),
                    email: email,
                    google: {
                        id: profile.id,
                        token: token
                    }
                };
                return userProjectModel.createUser(newUser);
            }
        }, function (err) {
            if (err) {
                return done(err);
            }
        })
        .then(function (user) {
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function updatePassword(req, res) {
    var userId = req.params['userId'];
    var data = req.body;
    var oldPwd = data.oldPwd;
    var newPwd = data.newPwd;
    var verifyPwd = data.verify;
    userProjectModel
        .findUserById(userId)
        .then(function(user) {
            console.log(user);
            if (bcrypt.compareSync (oldPwd, user.password)) {
                user.password = bcrypt.hashSync(newPwd);
                userProjectModel
                    .updatePassword(userId, user)
                    .then(function () {
                        res.sendStatus(200);
                    })
            }
        });
    res.sendStatus(200);
}


function login(req, res) {
    var user = req.user;
    res.json(user);
}

function checkAdmin(req, res) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function followUser(req, res) {
    var data = req.body;
    console.log("in servr");
    console.log(data);
    userProjectModel
        .followUser(data.follow, data.follower);
    res.sendStatus(200);
}

function unfollowUser(req, res) {
    var data = req.body;
    console.log("in servr");
    console.log(data);
    userProjectModel
        .unfollowUser(data.follow, data.follower);
    res.sendStatus(200);
}

function findFollowersById(req, res) {
    var userId = req.params['userId'];
    userProjectModel
        .findFollowersById(userId)
        .then(function (followers) {
            res.json(followers);
        });
    res.sendStatus(200);
}

function checkLoggedIn(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user)
    } else {
        res.send('0');
    }
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var user = req.body;
    console.log(user);
    user.password = bcrypt.hashSync(user.password);
    userProjectModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.json(user);
            });
        }, function (err) {
            console.log(err);
            res.send(err);
        });
}

/*function unregister(req, res) {
    userProjectModel
        .deleteUser(req.user._id)
        .then(function (status) {
            req.user.logout();
            res.sendStatus(200);
        }, function (err) {
            console.log(err);
        });
}*/

function unregister(req, res) {
    userProjectModel
        .deleteUser(req.user._id)
        .then(function (user) {
            req.logout();
            res.sendStatus(200);
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userProjectModel
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

//-------------------------------------------------------------------------------------
function findUserById(req, res) {
    var userId = req.params['userId'];
    userProjectModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

// function findAllUsers(req, res) {
//     var username = req.query['username'];
//     var password = req.query['password'];
//     if(username && password) {
//         return findUserByCredentials(req, res);
//     }
//     userModel
//         .findAllUsers()
//         .then(function (users) {
//             res.json(users);
//         });
// }

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    if(username && password) {
        return findUserByCredentials(req, res);
    }
    userProjectModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        });
}

function findUser(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    //to check if the url is /api/user?username=username&password=password
    if(typeof password === 'undefined'){
        userProjectModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user !== null){
                    res.json(user);
                }
                else {
                    res.sendStatus(404);
                }
            });
    }
    else {
        userProjectModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            },function (err) {
                res.sendStatus(404);
            });
    }
}

function createUser(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userProjectModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    userProjectModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
}


function deleteUser(req, res) {
    var userId = req.params.userId;
    userProjectModel
        .deleteUser(userId)
        .then(function (){
            res.sendStatus(200);
        });
}


