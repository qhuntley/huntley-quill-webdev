var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
//mongoose.createConnection('mongodb://localhost/webdev');

todoSchema = mongoose.Schema({
    title: String,
    dueDate: Date
}, {collection: 'todo'});

todoModel = mongoose.model('TodoModel', todoSchema);

todoModel.findAllTodos = findAllTodos;
todoModel.createTodo = createTodo;

modules.export = todoModel;

function findAllTodos() {
    return todoModel.find()
}

function createTodo(todo) {
    return todoModel.create(todo);
}
/*
var todo1 = {
    title: 'Pickp milk',
    dueDate: new Date()
};

todoModel
    .create(todo1)
    .then (function(doc) {
        console.log(doc);
    }, function (err) {
        console.log(err);
    });
*/
