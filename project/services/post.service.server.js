var app = require('../../express');
var postProjectModel = require('../model/post/post.model.server');
var userProjectModel = require('../model/user/user.model.server');
var multer = require('multer');
var upload = multer({ dest: __dirname + '/../../public/project/uploads'});

app.post('/api/project/user/:userId/post', createPost);
app.get('/api/project/user/:userId/post', findPostsByUserId);
app.get('/api/project/post/:postId', findPostById);
app.put('/api/project/post/:postId', updatePost);
app.delete('/api/project/post/:postId', deletePost);
app.get('/api/project/post', isAdmin, findAllPosts);

//app.post ('/api/project/upload', upload.single('myFile'), uploadImage);

function findPostsByUserId(req, res) {
    postProjectModel
        .findPostsByUserId(req.params.userId)
        .then(function (posts) {
            res.json(posts);
        });

}

function createPost(req, res) {
    var post = req.body;
    var userId = req.params.userId;
    postProjectModel
        .createPost(userId, post)
        .then(function (post) {
            res.json(post);
        });
}

function updatePost(req, res) {
    var post = req.body;
    var postId =  req.params.postId;
    postProjectModel
        .updatePost(postId, post)
        .then(function (status) {
            res.sendStatus(200);
        }, function(err) {
            res.sendStatus(404);
        });
}

function deletePost(req, res) {
    var postId = req.params.postId;
    postProjectModel
        .deletePost(postId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function findPostById(req, res) {
    var postId = req.params.postId;
    postProjectModel
        .findPostById(postId)
        .then(function (post) {
            res.json(post);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findAllPosts(req, res) {
    var author = req.query['_author'];
    var name = req.query['name'];
    var post = req.query['post'];
    if(author && name && post) {
        return findAllPostsForUser(req, res);
    }
    postProjectModel
        .findAllPosts()
        .then(function (posts) {
            res.json(posts);
        });
}


function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}

