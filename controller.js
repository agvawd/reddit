angular.module("reddit").controller('PostsController', function($scope, FirebaseService){
	
	 $scope.getData = function(){	
		FirebaseService.getData().then(function(response){
			$scope.posts = response;
		});
	}
	
	$scope.addPost = function() {
		FirebaseService.postData($scope.newPost).then(function(data){
			$scope.getData();
			$scope.newPost.title = "";
			$scope.newPost.body = "";
			$scope.newPost.author = "";
		});
	}

	$scope.vote = function(post, dir) {
		FirebaseService.voteData(post, dir).then(function(){
			$scope.getData();
		});
	}

	$scope.submitComment = function(id, comment) {
		debugger;
		FirebaseService.postComment(id, comment).then(function(data){
			$scope.getData();		
		});
	}
	$scope.getData();
});