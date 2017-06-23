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


module.exports = postProjectModel;


function createPost(userId, post) {
    post._author = userId;
    return postProjectModel
        .create(post)
        .then( function (post) {
            userProjectModel
                .findUserById(userId)
                .then(function (user) {
                    user.posts.push(post._id);
                    user.save();
                });
            return post;
        });
}

function findPostsByUserId(userId) {
    return postProjectModel
        .find({_author : userId})
        .sort({order: 1});
}

function findPostById(postId) {
    return postProjectModel.findOne({_id: postId});
}

function updatePost(postId, post) {
    return postProjectModel.update({_id: postId}, {
        $set: {
            name: post.name,
            postType: post.postType,
            post: post.post
        }
    });
}

function deletePost(postId){
    return postProjectModel
        .remove({_id: postId})
        .then(function () {
            postProjectModel
                .findOne({posts: postId})
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

/*function reorderWidget(pageId, start, end) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var widgets = page.widgets;
            var index = widgets.splice(start, 1)[0];
            widgets.splice(end, 0, index);
            page.widgets = widgets;
            return pageModel.updatePage(pageId, page);
        });
}*/

/*

function findPostsByUserId(userId) {
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

*/
