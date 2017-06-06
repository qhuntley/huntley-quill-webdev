module.exports = function(app) {

    // USERS
    app.get('/api/assignment/user', findUserByCredentials);
    app.get('/api/assignment/user/:userId', findUserById);
    app.post('/api/assignment/user', createUser);
    app.put('/api/assignment/user/:userId', updateUser);
    app.delete('/api/assignment/user/:userId', deleteUser);
    app.get('/api/assignment/user?username=username', findUserByUsername);


    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    function deleteUser(req, res) {
        var userId = req.params.userId;
        var user = users.find(function (user) {
            return user._id === userId;
        });
        var index = users.indexOf(user);
        users.splice(index, 1);
        res.sendStatus(200);
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        for(var u in users) {
            if(userId === users[u]._id) {
                users[u] = user;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime() + "";
        users.push(user);
        res.send(user);
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];
        var user = users.find(function (user) {
            return user._id === userId;
        });
        if(typeof user === 'undefined') {
            return res.send(404);
        }
        else {
            res.send(user);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        for (var u in users) {
            var user = users[u];
            if (user.username === username &&
                user.password === password) {
                res.json(user);
                return;
            }
            if (typeof password === 'undefined') {
                return findUserByUsername(res, username);
            }
        }
        res.sendStatus(404);
    }

    function findUserByUsername(res, username) {
        var user = users.find(function (user) {
            return user.username === username;
        });
        if (typeof user === 'undefined') {
            res.sendStatus(404);
        }
        else {
            res.send(user);
        }
    }


    //WEBSITES
    app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
    app.post('/api/assignment/user/:userId/website', createWebsite);
    app.get('/api/assignment/website/:websiteId', findWebsiteById);
    app.put('/api/assignment/website/:websiteId', updateWebsite);
    app.delete('/api/assignment/website/:websiteId', deleteWebsite);


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
        website._id = (new Date ()).getTime() + "";
        var userId = req.params.userId;
        website.developerId = userId;
        websites.push(website);
        res.json(website);
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId =  req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === websiteId) {
                website._id = websiteId;
                websites[w] = website;
                break;
            }
        }
        res.sendStatus(200);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = websites.find(function(website) {
            return website._id === websiteId;
        });

        var index = websites.indexOf(website);
        websites.splice(index, 1);
        res.sendStatus(200);

    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        var website = websites.find(function (website) {
            return website._id === websiteId;
        });
        if (typeof website === 'undefined') {
            return res.send(404);
        }
        else {
            res.send(website);
        }
    }

    function findAllWebsitesForUser(req, res) {
        var resultSet = [];
        for(var w in websites) {
            if (websites[w].developerId === req.params.userId) {
                resultSet.push(websites[w]);
            }
        }
        res.json(resultSet);
    }

    //PAGES
    app.post('/api/assignment/website/:websiteId/page', createPage);
    app.get('/api/assignment/website/:websiteId/page', findPageByWebsiteId);
    app.get('/api/assignment/page/:pageId', findPageById);
    app.put('/api/assignment/page/:pageId', updatePage);
    app.delete('/api/assignment/page/:pageId', deletePage);

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

    //WIDGETS
    app.post('/api/assignment/page/:pageId/widget', createWidget);
    app.get('/api/assignment/page/:pageId/widget', findWidgetsByPageId);
    app.get('/api/assignment/widget/:widgetId', findWidgetById);
    app.put('/api/assignment/widget/:widgetId', updateWidget);
    app.delete('/api/assignment/widget/:widgetId', deleteWidget);



    var widgets = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    var multer = require('multer');
    var upload = multer({ dest: __dirname+ '/../public/assignment/uploads'});

    app.post ("/api/assignment/uploads", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;    // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        console.log(myFile);
        var widget = {};
        for(var w in widgets) {
            if (widgets[w]._id = widgetId) {
                widget = widgets[w];
                break;
            }
        }

        widget.url = '/assignment/uploads/' + filename;

        console.log(widgetId);

        var callbackUrl   = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+ "/page/"
        + pageId + "/widget/" + widgetId;

        res.redirect(callbackUrl);
    }

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pageId;
        widget._id = (new Date()).getTime() + "";
        widget.pageId = pageId;
        widgets.push(widget);
        res.json(widget);
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;
        var resultSet = [];
        for(var w in widgets) {
            if (widgets[w].pageId === pageId) {
                resultSet.push(widgets[w]);
            }
        }
        res.json(resultSet);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        var widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });
        if(typeof widget === 'undefined') {
            res.sendStatus(200);
            return;
        }
        res.json(widget);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for(var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets[w] = widget;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });
        var index = widgets.indexOf(widget);
        widgets.splice(index, 1);
        res.sendStatus(200);
    }


};


