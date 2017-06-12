var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var websiteModel = require('../websites/website.model.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then( function (widget) {
            pageModel
                .findPageById(pageId)
                .then(function (page) {
                    page.widgets.push(widget._id);
                    page.save();
                });
            return widget;
        });
}

function findWidgetsByPageId(pageId) {
    return widgetModel.find({_page : pageId});
}

function findWidgetById(widgetId) {
    return widgetModel.findOne({_id: widgetId});
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {
        $set: {
            name: widget.name,
            widgetType: widget.widgetType,
            text: widget.text,
            placeholder: widget.placeholder,
            description: widget.description,
            size: widget.size,
            url: widget.url,
            width: widget.width,
            height: widget.height,
            deleteTable: widget.deleteTable
            /*rows: widget.rows,
            formatted: widget.formatted*/
        }
    });
}

function deleteWidget(widgetId){
    return widgetModel
        .remove({_id: widgetId})
        .then(function () {
            widgetModel
                .findOne({widgets: widgetId})
                .then(function (page) {
                    var index = page.widgets.indexOf(widgetId);
                    page.widgets.splice(index, 1);
                    page.save();
                });
        });
}
