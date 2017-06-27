
var mongoose = require('mongoose');
var postSchema = require('./post.schema.server');
var postProjectModel = mongoose.model('postProjectModel', postSchema);
var userProjectModel = require('../user/user.model.server');

postProjectModel.findPostsByUserId = findPostsByUserId;
postProjectModel.createPost = createPost;
postProjectModel.updatePost = updatePost;
postProjectModel.deletePost = deletePost;
postProjectModel.findPostById = findPostById;
postProjectModel.findAllPosts = findAllPosts;
postProjectModel.findPostsByMovieId = findPostsByMovieId;


module.exports = postProjectModel;


function createPost(userId, movieId, post) {
    post._author = userId;
    post.movieId = movieId;
    return postProjectModel
        .create(post)
        .then(function (post) {
            userProjectModel
                .findUserById(userId)
                .then(function (user) {
                    user.posts.push(post._id);
                    user.save();
                });
        });
}

function findPostsByUserId(userId) {
    return postProjectModel
        .find({_author : userId})
        .populate('_author')
        .exec();
}

function findPostsByMovieId(movieId) {
    return postProjectModel
        .find({movieId: movieId})
        .populate('_author')
        .exec();
}

function findPostById(postId) {
    return postProjectModel.findById(postId);
}

function updatePost(userId, movieId, postId, post) {
    return postProjectModel.update({_id: postId}, {
        $set: {
            _author: userId,
            movieId: movieId,
            name: post.name,
            postType: post.postType,
            post: post.post,
            url: post.url,
            width: post.width
        }
    });
}

function deletePost(userId, movieId, postId, post){
    return postProjectModel
        .remove({_id: postId})
        .then(function () {
            userProjectModel
                .findOne({_id: postId})
                .then(function (user) {
                    var index = user.posts.indexOf(postId);
                    user.posts.splice(index, 1);
                    user.save();
                });
        });
}

function findAllPosts() {
    return postProjectModel.find();
}
