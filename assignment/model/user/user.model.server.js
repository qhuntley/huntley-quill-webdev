var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findAllUsers = findAllUsers;


module.exports = userModel;

function findAllUsers() {
    return userModel.find();
}

function updateUser(userId, newUser) {
    return userModel.update({_id: userId}, {
        $set : {
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        }
    });
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    user.roles = ['USER'];
    return userModel.create(user);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}
