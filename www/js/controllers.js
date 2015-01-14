angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.authAttempt = false,
  user = false;
  // Get a reference to the Firebase
  FirebaseRef = new Firebase("https://wordpress-play.firebaseio.com");

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.authErrorMessage = function(message) {
    console.log('error: ', message);
    $scope.authAttempt = message;
    $scope.$apply();
  };

  // Create a callback to handle the result of the authentication
  $scope.authHandler = function(error, authData) {
    if (error) {
      // ERROR
      $scope.authErrorMessage(error.message);

    } else {
      // SUCCESSFULL
      // console.log("Authenticated successfully with payload:", authData);
      $scope.user = authData.password.email;
      // update UI with user info
      $scope.$apply();
      // close log in modal
      $scope.closeLogin();

      // update app with user settings

    }
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

    // check if there are values
    if(!$scope.loginData.email || !$scope.loginData.password) {
      console.log('we have no data!');
      $scope.authErrorMessage('Please fill out the fields!');
      return;
    }

    // reynoldschristopher55@gmail.com
    // me@me.com

    // log in with user/pass
    FirebaseRef.authWithPassword({
      email    : $scope.loginData.email,
      password : $scope.loginData.password
    }, $scope.authHandler);


    };

    // Logs a user out
  $scope.logout = function() {
    // firebase unauthenticate current user logged in
    FirebaseRef.unauth();
    // reset user variables
    $scope.user = false,
    $scope.authAttempt = false,
    $scope.loginData.password = '',
    $scope.loginData.email = '';
    // $scope.$apply();
  };

  $scope.FireBaseCreateUser = function() {
    var ref = new Firebase("wordpress-play.firebaseapp.com");
    ref.createUser({
      email    : "bobtony@firebase.com",
      password : "correcthorsebatterystaple"
    }, function(error) {
      if (error === null) {
        console.log("User created successfully");
      } else {
        console.log("Error creating user:", error);
      }
    });
  };

})

.controller('DashboardCtrl', function($scope, $stateParams, $http) {
  
  // $http.get('https://public-api.wordpress.com/oauth2/authorize?client_id=38844&redirect_uri=https://pacific-ridge-7435.herokuapp.com&response_type=Native&blog=1234').then(function(resp) {
  //   console.log('Success', resp);
  //   // For JSON responses, resp.data contains the result
  // }, function(err) {
  //   console.error('ERR', err);
  //   // err.status will contain the status code
  // })

})

.controller('PagesCtrl', function($scope) {
  $scope.pages = [
    { title: 'Home', id: 1 },
    { title: 'About', id: 2 },
    { title: 'Products', id: 3 },
    { title: 'Blog', id: 4 },
    { title: 'Maps', id: 5 },
    { title: 'Synergy', id: 6 },
    { title: 'Customers', id: 7 },
    { title: 'Partners', id: 8 },
    { title: 'Contact Us', id: 9 }
  ];
})

.controller('PageCtrl', function($scope, $stateParams) {
})

.controller('StatsCtrl', function($scope){

  // $http.get('https://cors-test.appspot.com/test').then(function(resp) {
  //   console.log('Success', resp);
  //   // For JSON responses, resp.data contains the result
  // }, function(err) {
  //   console.error('ERR', err);
  //   // err.status will contain the status code
  // })

})

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});