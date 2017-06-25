var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var pageModel = require('../pages/page.model.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

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
    return widgetModel
        .find({_page : pageId})
        .sort({order: 1});
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
            url: widget.url,
            width: widget.width,
            height: widget.height,
            rows: widget.rows,
            size: widget.size,
            deleteTable: widget.deleteTable,
            formatted: widget.formatted
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

function reorderWidget(pageId, start, end) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var widgets = page.widgets;
            var index = widgets.splice(start, 1)[0];
            widgets.splice(end, 0, index);
            page.widgets = widgets;
            return pageModel.updatePage(pageId, page);
        });
}
