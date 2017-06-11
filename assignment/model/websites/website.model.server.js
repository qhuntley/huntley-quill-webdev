var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
var userModel = require('../user/user.model.server');


websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.findWebsiteById = findWebsiteById;

module.exports = websiteModel;

function createWebsite(userId, website) {
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
            userModel
                .findUserById(userId)
                .then(function (user) {
                    user.websites.push(website);
                    user.save();
                });
        });
}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user', 'username')
        .exec();
}

function updateWebsite(websiteId, newWebsite) {
    return websiteModel.update({_id: websiteId}, {
        $set: {
            name: newWebsite.name,
            description: newWebsite.description
        }
    });

}

function deleteWebsite(websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function () {
            userModel
                .findOne({websites: websiteId})
                .then(function (user) {
                    var index = user.websites.indexOf(websiteId);
                    user.websites.splice(index, 1);
                    user.save();
                });
        });
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId)
}

