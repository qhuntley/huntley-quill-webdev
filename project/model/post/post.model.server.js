var mongoose = require('mongoose');
var postSchema = require('./post.schema.server');
var postProjectModel = mongoose.model('postProjectModel', postSchema);
var userProjectModel = require('../user/user.model.server');


postProjectModel.findAllPostForUser = findAllPostForUser;
postProjectModel.createPost = createPost;
postProjectModel.updatePost = updatePost;
postProjectModel.deletePost = deletePost;
postProjectModel.findPostById = findPostById;
postProjectModel.findAllPosts = findAllPosts;


module.exports = postProjectModel;

function findAllPostForUser(userId) {
    return postProjectModel
        .find({_author: userId})
        .populate('_author', 'username')
        .exec();
}

function createPost(userId, post) {
    post._author = userId;
    return postProjectModel
        .create(post)
        .then(function (post) {
            userProjectModel
                .findUserById(userId)
                .then(function (user) {
                    user.posts.push(post);
                    user.save();
                });
        });
}

function updatePost(postId, newPost) {
    return postProjectModel.update({_id: postId}, {
        $set: {
            name: newPost.name,
            post: newPost.post
        }
    });

}

function deletePost(postId) {
    return postProjectModel
        .remove({_id: postId})
        .then(function () {
            userProjectModel
                .findOne({posts: postId})
                .then(function (user) {
                    var index = user.posts.indexOf(postId);
                    user.posts.splice(index, 1);
                    user.save();
                });
        });
}

function findPostById(postId) {
    return postProjectModel.findById(postId)
}

function findAllPosts() {
    return postProjectModel.find();
}

