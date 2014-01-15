/*
'use strict';
/* Controllers */
/*
angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }]);
  */
  
  'use strict';
/* Controllers */
function LoginCtrl($scope) {
 
    var parameters = {"scope":"https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email",
      "requestvisibleactions": 'http://schemas.google.com/AddActivity',
      "clientId":"831491199430-80elp5cleulr6rc317b0dtbq7ce0ga5p.apps.googleusercontent.com",
      "theme":"dark", 
      "callback":function(authResult) {$scope.onSignInCallback(authResult)},
      "cookiepolicy":"single_host_origin"};
 
    gapi.signin.render('gButton',parameters);
    $scope.onSignInCallback = function(authResult) {
         gapi.client.load('plus','v1', function(){
	    if (authResult['access_token']) {
                $('#gButton').hide();
		$('#authOps').show();
		var request = gapi.client.plus.people.get( {'userId' : 'me'} );
		request.execute( function(profile) {
			console.log(profile)
			$scope.profile = profile;
			$scope.$apply();
		});
	    } 
      	});
    };
 
   $scope.logout = function() {
         $.ajax({
          type: 'GET',
          url: 'https://accounts.google.com/o/oauth2/revoke?token=' + gapi.auth.getToken().access_token,
          async: false,
          contentType: 'application/json',
          dataType: 'jsonp',
          success: function(result) {
            $('#authOps').hide();
            $('#lstActivities').empty();
            $('#gButton').show();
          },
          error: function(e) {
            console.log(e);
          }
        });
    };
 
    $scope.loadTimeLine = function() {
         var request = gapi.client.plus.activities.list({'userId' : 'me'});
	 request.execute( function(activities) {
	    $scope.activities = activities.result.items;
	    $scope.$apply();
	 });
   };
 
};