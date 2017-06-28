var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userProjectModel = mongoose.model('userProjectModel', userSchema);
var bcrypt = require("bcrypt-nodejs");

userProjectModel.createUser = createUser;
userProjectModel.findUserById = findUserById;
userProjectModel.findUserByCredentials = findUserByCredentials;
userProjectModel.deleteUser = deleteUser;
userProjectModel.updateUser = updateUser;
userProjectModel.findUserByUsername = findUserByUsername;
userProjectModel.findUserByFacebookId = findUserByFacebookId;
userProjectModel.updateFacebookToken = updateFacebookToken;
userProjectModel.findAllUsers = findAllUsers;
userProjectModel.findUserByGoogleId = findUserByGoogleId;
userProjectModel.followUser = followUser;
userProjectModel.unfollowUser = unfollowUser;
userProjectModel.findFollowersById = findFollowersById;
userProjectModel.updatePassword = updatePassword;


module.exports = userProjectModel;

function findAllUsers() {
    return userProjectModel.find();
}

function updatePassword(userId, user) {
    return userProjectModel.update({_id: userId}, {
        $set: {
            password: user.password
        }
    });
}

function createUser(user) {

    user.roles = ['USER'];

    return userProjectModel.create(user);
}

function findUserById(userId) {
    return userProjectModel
        .findById(userId)
        .populate('reviews')
        .populate('posts')
        .populate('followers')
        .populate('following')
        .exec();
}

function findUserByCredentials(username, password) {
    return userProjectModel
        .findOne({username : username, password : password});
}

function deleteUser(userId) {
    return userProjectModel.remove({_id: userId});
}

function updateUser(userId, user) {
    //user.roles = user.roles.split(',');
    return userProjectModel.update({_id: userId}, {
        $set: {
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles
        }
    });
}

function followUser(follow, follower) {
    userProjectModel
        .findUserById(follower._id)
        .then(function (user) {
            user.following.push(follow._id);
            user.save();
        });

    return userProjectModel
        .findUserById(follow._id)
        .then(function (user) {
            user.followers.push(follower._id);
            user.save();
        });
}

function unfollowUser(follow, follower) {
    console.log("unfolloe process");
    userProjectModel
        .findUserById(follower._id)
        .then(function (user) {
            console.log(user);
            console.log("Trying to pull");
            var index = user.following.indexOf(follow._id);
            user.following.splice(index, 1);
            user.save();
            console.log(user);
            console.log(user.following);
        });

    return userProjectModel
        .findUserById(follow._id)
        .then(function (user) {
            console.log(user);
            console.log("Trying to pull");
            var index = user.followers.indexOf(follower._id);
            user.followers.splice(index, 1);
            user.save();
            console.log(user);
            console.log(user.followers);
        });
}

function findFollowersById(userId) {
    var followersId = userId.followers;
    var followers = [];
    for(i = 0; i < followersId.length; i++) {

    }
    return followers;
}

function findUserByUsername(username) {
    return userProjectModel.findOne({username: username});
}

function findUserByFacebookId(facebookId) {
    return userProjectModel.findOne({'facebook.id': facebookId});
}

function findUserByGoogleId(googleId) {
    return userProjectModel.findOne({'google.id':googleId});
}

function updateFacebookToken(userId, facebookId, token) {
    var facebook = {
        id: facebookId,
        token: token
    };

    return userProjectModel
        .update({_id: userId}, {
            $set : {
                facebook: facebook
            }
        });
}