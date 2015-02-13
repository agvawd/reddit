angular.module("reddit").service('FirebaseService', function($http, $q){
	
	this.getData = function() {
		var deferred = $q.defer();
		$http({
			method: "GET",
			url: "https://devmtn.firebaseio.com/posts.json"
		})
		.then(function(response){
			deferred.resolve(response.data);

		})
		return deferred.promise;
	}	

	this.voteData = function(post, direction) {
		if(direction === "up") {
			post.karma++;
		}
		else if (direction === "down") {
			post.karma--;
		}
		var deferred = $q.defer();
		$http({
			method: "PATCH",
			url: "https://devmtn.firebaseio.com/posts/" + post.id + '.json',
			data: post
		}).then(function(response){
			deferred.resolve(response);
		})
		return deferred.promise;
	}
	
	this.postComment = function(postID, commentObj) {
		$http({
			method: "POST",
			url: "https://devmtn.firebaseio.com/posts/" + postID + '/comments.json',
			data: {comments: commentObj}
		})
	}

	var guid = function() {
    var s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  	}

	this.postData = function(post) {
		var deferred = $q.defer();
		post.timestamp = Date.now();
		post.comments = [];
		post.karma = 0;
		post.id = guid();
		$http({
			method: "PUT",
			url: "https://devmtn.firebaseio.com/posts/" + postId + '.json', 
			data: post
		}).then(function(response){
			deferred.resolve(response.data);
		})
		return deferred.promise;
	}
})
