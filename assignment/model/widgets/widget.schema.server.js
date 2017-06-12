var mongoose = require('mongoose');
var widgetSchema = mongoose.Schema({
    _page : {type: mongoose.Schema.ObjectId, ref: 'PageModel'},
    widgetType: {type: String, enum: ["HTML", "HEADING", "LABEL", "TEXT",
        "LINK", "BUTTON", "IMAGE", "YOUTUBE","DATATABLE", "REPEATER"]},
    name      : {type:String, default:'Text'},
    text      : String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    /*
    class: String,
    icon: String,
    deleteTable: Boolean,
    formatted: Boolean,*/
    dateCreated: {type: Date, default: Date.now}
},{collection: 'widget'});

module.exports = widgetSchema;