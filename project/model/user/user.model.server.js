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

module.exports = userProjectModel;

function createUser(user) {
    console.log(user);
    return userProjectModel.create(user);
}

function findUserById(userId) {
    return userProjectModel.findById(userId);
}

function findUserByCredentials(username, password) {
    return userProjectModel
        .findOne({username : username, password : password});
}

function deleteUser(userId) {
    return userProjectModel.remove({_id: userId});
}

function updateUser(userId, user) {
    return userProjectModel.update({_id: userId}, {
        $set: {
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }
    });
}

function findUserByUsername(username) {
    return userProjectModel.findOne({username: username});
}

function findUserByFacebookId(facebookId) {
    return userProjectModel.findOne({'facebook.id': facebookId});
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

