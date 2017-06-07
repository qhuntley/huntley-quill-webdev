var app = require('../../express');

var multer = require('multer');
var upload = multer({ dest: __dirname + '/../../public/assignment/uploads'});

app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findWidgetsByPageId);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);
app.post ('/api/upload', upload.single('myFile'), uploadImage);


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

    var widget = null;
    for(var w in widgets) {
        if (widgets[w]._id === widgetId) {
            widget = widgets[w];
            break;
        }
    }

    widget.url = '/assignment/uploads/' + filename;


    var callbackUrl   = "/assignment/index.html#!/user/"+ userId +"/website/"+ websiteId + "/page/"
        + pageId + "/widget/" + widgetId;

    res.redirect(callbackUrl);
}

function sortedWidgets(req, res) {
    var resultSet = [];
    var initial = req.query['initial'];
    var final = req.query['final'];
    var len = widgets.length;
    for (var i = len - 1; 0 <= i; i--) {
        if (widgets[i].pageId === req.params.pageId) {
            resultSet.unshift(widgets[i]);
            widgets.splice(i, 1);
        }
    }
    var widget = resultSet[initial];
    resultSet.splice(initial, 1);
    resultSet.splice(final, 0, widget);
    widgets = widgets.concat(resultSet);
    res.sendStatus(200);
}

function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widget._id = (new Date()).getTime() + "";
    widget.pageId = pageId;
    widgets.push(widget);
    res.send(widget);
}

function findWidgetsByPageId(req, res) {
    var pageId = req.params.pageId;
    var resultSet = [];
    for(var w in widgets) {
        if (widgets[w].pageId === pageId) {
            resultSet.push(widgets[w]);
        }
    }
    if(resultSet) {
        res.json(resultSet);
        return;
    }
    res.sendStatus(404);
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    if (widget) {
        res.json(widget);
        return;
    }
    res.sendStatus(404);
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

