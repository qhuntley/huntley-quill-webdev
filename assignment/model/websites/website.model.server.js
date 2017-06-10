var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.findWebsiteById = findWebsiteById;

module.exports = websiteModel;

function createWebsite(userId, website) {
    website._user = userId;
    return websiteModel.create(website);
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
    return websiteModel.remove({_id: websiteId});
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

