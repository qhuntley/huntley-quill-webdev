var app = require('../../express');

app.post('/api/website/:websiteId/page', createPage);
app.get('/api/website/:websiteId/page', findPageByWebsiteId);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

function createPage(req, res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    var websiteId = req.params.websiteId;
    page.websiteId = websiteId;
    pages.push(page);
    res.send(page);
}


function findPageByWebsiteId(req, res) {
    var websiteId = req.params.websiteId;
    var resultSet = [];
    for(var p in pages) {
        if (pages[p].websiteId === websiteId) {
            resultSet.push(pages[p]);
        }
    }
    res.json(resultSet);
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    var page = pages.find(function (page) {
        return page._id === pageId;
    });
    if(typeof page === 'undefined') {
        res.sendStatus(200);
        return;
    }

    res.json(page);
}

function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params.pageId;
    for(var p in pages) {
        if (pageId === pages[p]._id) {
            pages[p] = page;
            page._id = pageId;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    var page = pages.find(function (page) {
        return page._id === pageId;
    });
    var index = pages.indexOf(page);
    pages.splice(index, 1);
    res.sendStatus(200);
}