var app = require('../../express');
var websiteModel = require('../model/websites/website.model.server');

app.get('/api/user/:userId/website', findAllWebsitesForUser);
app.post('/api/user/:userId/website', createWebsite);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsite(userId, website)
        .then(function (website) {
            res.json(website);
        });
    //website._user = userId;
    //websites.push(website);
    //res.json(website);
}

function updateWebsite(req, res) {
    var website = req.body;
    var websiteId =  req.params.websiteId;
    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.sendStatus(200);
        }, function(err) {
            res.sendStatus(404);
        });
    /*for(var w in websites) {
        if(websites[w]._id === websiteId) {
            website._id = websiteId;
            websites[w] = website;
            break;
        }
    }
    res.sendStatus(200);*/
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .deleteWebsite(websiteId)
        .then(function (status) {
            res.sendStatus(200);
        });
   /* var website = websites.find(function(website) {
        return website._id === websiteId;
    });
    var index = websites.indexOf(website);
    websites.splice(index, 1);
    res.sendStatus(200);
    */
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        });
    /*
    var website = websites.find(function (website) {
        return website._id === websiteId;
    });
    if (typeof website === 'undefined') {
        return res.send(404);
    }
    else {
        res.send(website);
    }*/
}

function findAllWebsitesForUser(req, res) {
    websiteModel
        .findAllWebsitesForUser(req.params.userId)
        .then(function (websites) {
            res.json(websites);
        });
    /*var resultSet = [];
    for(var w in websites) {
        if (websites[w].developerId === req.params.userId) {
            resultSet.push(websites[w]);
        }
    }
    res.json(resultSet);*/
}