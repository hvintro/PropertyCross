angular.module('request.controller',['request.controller'])
.controller('AppCtrl', ['$scope' ,'requestSrc','$cordovaOauth','$http','$q',function($scope,requestSrc,$cordovaOauth,$http,$q){
	
	$scope.profile = {};
	$scope.profile.name = "";
	$scope.profile.photo = "";
	$scope.profile.email = "";
	//$scope.profile.friends = "";

	$scope.sendRequest = function(){

		//console.log("The email is " + $scope.profile.mail + " & the pass is: " + $scope.profile.pass);
		$scope.endPoint = "register/signup username=\"" + $scope.profile.mail + "\" pwd=\"" + $scope.profile.pass + "\" client_id=\"android\" client_secret=\"SomeRandomCharsAndNumbers\"";
		//$scope.endPoint = "register/signup";

		var params = {username : $scope.profile.mail,
					pwd : $scope.profile.pass,
					client_id : "android",
					client_secret : "SomeRandomCharsAndNumbers"};

		var data =
			JSON.stringify({
				username : $scope.profile.mail,
				pwd : $scope.profile.pass,
				client_id : "android",
				client_secret : "SomeRandomCharsAndNumbers"
			});

		requestSrc.parseJSon($scope.endPoint).then(function(res){
			console.log("Iuhuuuu avui per sopar tenim gat a la brasa");
			console.log(res);
		});

		// var url = "https://push.opentrends.net:8100/mdpa/api/" + $scope.endPoint;

		return requestSrc.parseJSon();
	};


	$scope.Login2 = function() {
		$http.post("http://localhost/example.json",
			{ params: {
				"username" : $scope.profile.mail,
				"pwd" : $scope.profile.pass,
				"client_id" : "android",
				"client_secret" : "SomeRandomCharsAndNumbers"} })
			.success(function(data) {
				console.log(data);
			})
			.error(function(data) {
				alert($translate.instant('error_success'));
			});
	};

	$scope.Login = function() {
		requestSrc.callfbapi(function (success) {
			alert("hasta qui! " + success.data.id + success.data.title)
		},function (error){
			alert("error");
		})
	};

	$scope.loguinwithfacebook = function(){

		requestSrc.login(function(success){

			$scope.profile.name = success.name;
			$scope.profile.email = success.email;
			$scope.profile.photo = success.picture.data.url;
			//$scope.profile.friends =  success.friends.summary.total_count;
			

		},function(error){
			alert("error");
		});
	};
	

 }]);