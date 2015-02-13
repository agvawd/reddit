angular.module("reddit").controller('PostsController', function($scope, FirebaseService){
	 var getData = function(){	
		FirebaseService.getData().then(function(response){
			$scope.posts = response;
		})
	}

	getData();
	$scope.addPost = function() {
		FirebaseService.postData($scope.newPost).then(function(data){
			getData();
		});
	}

	$scope.vote = function(post, dir) {
		FirebaseService.voteData(post, dir).then(function(){
			getData();
		});
	}

	$scope.submitComment = function(id, comment) {
		FirebaseService.postComment(id, comment).then(function(data){
			getData();		
		});
	}
});