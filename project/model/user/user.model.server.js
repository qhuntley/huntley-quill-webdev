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


module.exports = userProjectModel;

function findAllUsers() {
    return userProjectModel.find();
}


function createUser(user) {
  /*  if(user.roles) {
        user.roles = user.roles.split(',');
    } else {
        user.roles = ['USER'];
    }
    return userProjectModel.create(user);*/

    user.roles = ['USER'];

    return userProjectModel.create(user);
}

function findUserById(userId) {
    return userProjectModel
        .findById(userId)
        .populate('reviews')
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
    user.roles = user.roles.split(',');
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



