(function () {
    angular
        .module('MovieApp')
        .controller('userPublicProjectController', userPublicProjectController);

    function userPublicProjectController( currentUser, $location, userProjectService, $routeParams, $scope) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.loggedUser = currentUser;
        if (model.loggedUser !== 0){
            //model.followUsers = followUsers;
            //model.unfollowUsers = unfollowUsers;
        }

        model.follow = follow;
        model.unfollow = unfollow;

        function init(){

            userProjectService
                .findUserById(model.userId)
                .then(function (user) {
                    console.log(user);
                    model.user = user;
                });


            var following = currentUser.following;
            model.isfollow = false;
            if(following){
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


            $('button').click(function(){
                var $this = $(this);
                $this.toggleClass('following');
                if($this.is('.following')){
                    $this.addClass('wait');
                }
            }).on('mouseleave',function(){
                $(this).removeClass('wait');
            })

        }
        init();

        model.selectFollower = selectFollower;
        model.isfollowing = isfollowing;

        function selectFollower(follower) {
            var userId = follower._id;
            $location.url('/user/'+ userId + '/profile-public');
        }

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
            model.isfollow = true;
            $location.url('/user/'+ model.userId + '/profile-public');
        }

        function unfollow(follow, follower) {
            console.log("trying to unfollow");
            userProjectService
                .unfollowUser(follow, follower)
                .then(function (response) {
                    console.log(response);
                });
            model.isfollow = false;
            $location.url('/user/'+ model.userId + '/profile-public');
        }

        // function followUser(newFollowerId) {
        //     userProjectService
        //         .followUser(newFollowerId)
        //         .then(function (response) {
        //             console.log(response);
        //         })
        // }
        //
        // function unfollowUser(userId, newFollowerId) {
        //         userProjectService
        //             .unfollowUser(userId, newFollowerId)
        //             .then(function (response) {
        //                 model.followers = response;
        //             })
        // }

        isfollow = false;
        $scope.toggle = function (user, loggedUser) {
            if (isfollow) { called = false; return $scope.follow(user, loggedUser); }
            $scope.unfollow(model.user, model.loggedUser);
            isfollow = true;
        }

    }

})();