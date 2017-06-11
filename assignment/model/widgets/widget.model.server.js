var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var websiteModel = require('../websites/website.model.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsByPageId = findAllWidgetsByPageId;
module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel.create(widget);
    // .then( function (widget) {
    //     websiteModel
    //         .findWidgetById(pageId)
    //         .then(function (page) {
    //             page.widgets.push(widget._id);
    //             page.save();
    //         });
    // });
}

function findAllWidgetsByPageId(pageId) {
    return widgetModel.find({_page : pageId});
}