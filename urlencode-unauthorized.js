	// create the module and name it scotchApp
	var modApp = angular.module('newApp', ['ngRoute']);

	// configure our routes
	modApp.config(function($routeProvider,$httpProvider) {
		
		$httpProvider.defaults.headers.post = {};
		
		$routeProvider
			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			});
		
		
		
	});

	// create the controller and inject Angular's $scope
	modApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
	});

	modApp.controller('aboutController', function($scope,$http,transformRequestAsFormPost) {
		$scope.message = 'Look! I am an about page.';
		
		
		/*var formData = {authToken:"aa56493sAafazxhafaovnappvaneioj"};
		
		$http({
			url: "http://172.16.10.12/poultry/batch_header",
			method: 'POST',
			data: formData,
			{ 
				headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
			}
		})
		.success(function(data, status, headers, config) {
				console.log(data);
				
			  if (data.status) {
			  } else {
			  }
		})*/
		
		
		var formData = {authToken:"aa56493sAafazxhafaovnappvaneioj"};
		
		var request = $http({
            method: "post",
            url: "http://172.16.10.12/poultry/batch_header",
            transformRequest: transformRequestAsFormPost,
            data: formData
        });
		
		// Store the data-dump of the FORM scope.
        request.success(
            function( data ) {
                console.log(data);
            }
        );
		
			
	});

	
	modApp.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a test.';
	});
	
	// I provide a request-transformation method that is used to prepare the outgoing
    // request as a FORM post instead of a JSON packet.
	modApp.factory(
        "transformRequestAsFormPost",
        function() {
            // I prepare the request data for the form post.
            function transformRequest( data, getHeaders ) {
                var headers = getHeaders();
                headers[ "Content-type" ] = "application/x-www-form-urlencoded; charset=utf-8";
                return( serializeData( data ) );
            }
            // Return the factory value.
            return( transformRequest );
            // ---
            // PRVIATE METHODS.
            // ---
            // I serialize the given Object into a key-value pair string. This
            // method expects an object and will default to the toString() method.
            // --
            // NOTE: This is an atered version of the jQuery.param() method which
            // will serialize a data collection for Form posting.
            // --
            // https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
            function serializeData( data ) {
                // If this is not an object, defer to native stringification.
                if ( ! angular.isObject( data ) ) {
                    return( ( data == null ) ? "" : data.toString() );
                }
                var buffer = [];
                // Serialize each key in the object.
                for ( var name in data ) {
                    if ( ! data.hasOwnProperty( name ) ) {
                        continue;
                    }
                    var value = data[ name ];
                    buffer.push(
                        encodeURIComponent( name ) +
                        "=" +
                        encodeURIComponent( ( value == null ) ? "" : value )
                    );
                }
                // Serialize the buffer and clean it up for transportation.
                var source = buffer
                    .join( "&" )
                    .replace( /%20/g, "+" )
                ;
                return( source );
            }
        }
    );
