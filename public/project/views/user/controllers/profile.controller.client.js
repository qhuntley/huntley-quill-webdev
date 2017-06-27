(function () {
    angular
        .module('MovieApp')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userProjectService, $routeParams, NgTableParams) {


        var model = this;
        model.user = currentUser;
        model.loggedUser = currentUser;

        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logout = logout;
        model.follow = follow;
        model.unfollow = unfollow;

        function init(){
            //model.user.reviews;
           // var self = this;
            //access from dataset
            //article.dataset.user.reviews;

            var following = currentUser.following;
            model.isfollow = false;
            for(i = 0; i < following.length; i++){
                var currfollower = following[i];
                console.log("in here");
                console.log(currfollower._id);
                console.log(model.userId);
                if(currfollower._id === model.userId){
                    model.isfollow = true;
                    break;
                }
            }
        }
        init();

        model.selectFollower = selectFollower;
        //model.selectFollowing = selectFollowing;
        model.isfollowing = isfollowing;

        function selectFollower(follower) {
            var userId = follower._id;
            $location.url('/user/'+ userId + '/profile-public');
        }

        /*function selectFollowing(following) {
            var userId = following._id;
            $location.url('/user/'+ userId + '/profile-public');
        }*/

        function isfollowing(loggedUser, user) {
            var following = loggedUser.following;
            for(i = 0; i < following.length; i++){
                var currfollower = following[i];
                console.log("in here");
                console.log(currfollower);
                if(currfollower._id === model.userId){
                    model.isfollow = true;
                    break;
                }
            }
            model.isfollow = false;
        }


        function follow(follow, follower) {
            console.log("jefelnvkm");
            userProjectService
                .followUser(follow, follower)
                .then(function (response) {
                    console.log(response);
                });
        }

        function unfollow(follow, follower) {
            console.log("trying to unfollow");
            userProjectService
                .unfollowUser(follow, follower)
                .then(function (response) {
                    console.log(response);
                });
        }

        function updateUser(user) {
            userProjectService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User updated successfully!";
                });
        }


        function unregister() {
            userProjectService
                .unregister()
                .then(function () {
                    $location.url('/login');
                }, function (err) {
                    console.log(err);
                });
        }

        function logout() {
            userProjectService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
}) ();