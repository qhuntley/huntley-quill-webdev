(function () {
    angular
        .module('MovieApp')
        .controller('userPublicProjectController', userPublicProjectController);

    function userPublicProjectController(currentUser, $location, userProjectService) {

        var model = this;
        var userId = currentUser._id;
        model.user = currentUser;

        //model.followUser = followUser;
        //model.unfollowUser = unfollowUser;

        function init(){
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

        /*function followUser(newFollowerId) {
            userProjectService
                .followUser(newFollowerId)
                .then(function (response) {
                    console.log(response);
                })
        }

        function unfollowUser(userId, newFollowerId) {
                userProjectService
                    .unfollowUser(userId, newFollowerId)
                    .then(function (response) {
                        model.followers = response;
                    })
        }*/

    }

})();