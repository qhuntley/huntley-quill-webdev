var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var websiteModel = require('../websites/website.model.server');
var pageModel = mongoose.model('PageModel', pageSchema);


pageModel.createPage = createPage;
pageModel.findPageByWebsiteId = findPageByWebsiteId;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            websiteModel
                .findWebsiteById(websiteId)
                .then(function (website) {
                    website.pages.push(page);
                    website.save();
                });
        });
}


function findPageByWebsiteId(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website', 'name')
        .exec();
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, newPage) {
    return pageModel.update({_id: pageId}, {
        $set: {
            name: newPage.name,
            title: newPage.title,
            description: newPage.description
        }
    });
}

function deletePage(pageId) {
    return pageModel
        .remove({_id: pageId})
        .then (function () {
            websiteModel
                .findOne({pages: pageId})
                .then(function (website) {
                    var index = website.pages.indexOf(pageId);
                    website.pages.splice(index, 1);
                    website.save();
                });
        });
}

