var app = require('../../express');
var postProjectModel = require('../model/post/post.model.server');
var userProjectModel = require('../model/user/user.model.server');

var multer = require('multer');
var upload = multer({ dest: __dirname + '/../../public/project/uploads'});

app.post('/api/project/user/:userId/movie/:movieId/post', createPost);
app.get('/api/project/user/:userId/post', findPostsByUserId);
app.get('/api/project/post/:postId', findPostById);
app.put('/api/project/user/:userId/movie/:movieId/post/:postId', updatePost);
app.delete('/api/project/user/:userId/movie/:movieId/post/:postId', deletePost);
app.get('/api/posts', isAdmin, findAllPosts);
app.get('/api/project/posts/:movieId', findPostsByMovieId);
app.post ('/api/project/upload', upload.single('myFile'), uploadImage);


function uploadImage(req, res) {
    var post =  req.body;

    var myFile        = req.file;
    var userId = req.body.userId;
    var movieId = req.body.movieId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;    // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    console.log(myFile);

    post.url = "/project/uploads/" + filename;
    post.postType = 'IMAGE';
    post.name = '';
    postProjectModel
        .createPost(userId, movieId, post)
        .then(function () {
            var callbackUrl = "/project/index.html#!/page/" + movieId;
            console.log(callbackUrl);
            res.redirect(callbackUrl);
     });
}

function findPostsByUserId(req, res) {
    postProjectModel
        .findPostsByUserId(req.params.userId)
        .then(function (posts) {
            res.json(posts);
        });

}

function findPostsByMovieId(req, res) {
    var movieId = req.params.movieId;
    console.log("in server");
    console.log(movieId);
    postProjectModel
        .findPostsByMovieId(movieId)
        .then(function (posts) {
            res.json(posts);
        })
}

function createPost(req, res) {
    var post = req.body;
    var userId = req.params.userId;
    var movieId = req.params.movieId;
    console.log("heloooooooooooooooooooooooooooooooo");
    console.log(post);
    postProjectModel
        .createPost(userId, movieId, post)
        .then(function (post) {
            console.log(post);
            res.json(post);
        });
}

function updatePost(req, res) {
    var post = req.body;
    var userId = req.params.userId;
    var movieId = req.params.movieId;
    var postId =  req.params.postId;
    postProjectModel
        .updatePost(userId, movieId, postId, post)
        .then(function (status) {
            res.sendStatus(200);
        }, function(err) {
            res.sendStatus(404);
        });
}


function deletePost(req, res) {
    var post = req.body;
    var userId = req.params.userId;
    var movieId = req.params.movieId;
    var postId =  req.params.postId;
    postProjectModel
        .deletePost(userId, movieId, postId, post)
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
    var post = req.query['post'];
    if(author && post) {
        return findPostsByUserId(req, res);
    }
    postProjectModel
        .findAllPosts()
        .then(function (posts) {
            if(posts) {
                res.json(posts);
            }
            else {
                res.sendStatus(200);
            }
        });
}


function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}