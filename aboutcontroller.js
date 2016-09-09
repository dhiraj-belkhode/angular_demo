modApp.controller('aboutController', function($scope,$http,transformRequestAsFormPost) {
		$scope.message = 'Look! I am an about page.';
		
		var formData = 'authToken='+encodeURIComponent('aa56493sAafazxhafaovnappvaneioj');
		
		$http({
			method: 'get',
			url: "https://api.github.com/users/hadley/orgs",
			data: formData,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.success(function(data, status, headers, config) {
			console.log(data);
		})
		
	});