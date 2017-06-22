var app = angular.module('myApp', ['ngRoute']); //

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "views/partials/logIn.html",
        controller: "ShelfController"
    }).when('/register', {
        templateUrl: "views/partials/register.html",
        controller: "ShelfController"
    }).when('/loggedIn', {
        templateUrl: "views/partials/loggedIn.html",
        controller: "ShelfController"
    });
});

app.controller('ShelfController', ShelfController);

function ShelfController(ShelfService, $location) {
    var vm = this;

    console.log('NG is here');

    vm.go = function(path) {
        $location.path(path);
    };

    vm.registerUser = function() {
      console.log('vm.registerUser clicked!');
        if (vm.inputed.password !== vm.inputed.password2) {
            alert("passwords don't match!");
        } else {
            var credentials = {
                username: vm.inputed.username,
                password: vm.inputed.password
            };
            ShelfService.postRegister( credentials ).then(function(response) {
              if (response.status == 201 ) {
                vm.go('/');
                vm.inputed.username ='';
                vm.inputed.password = '';
                vm.inputed.password2 = '';
              } else {

              }
            });
        }
    };
    vm.loginUser = function() {
      console.log('vm.registerUser clicked!');
            var credentials = {
                username: vm.inputed.username,
                password: vm.inputed.password
            };
            ShelfService.postLogin( credentials ).then(function(response) {
              if (response.status == 200 ) {
                vm.go('/loggedIn');
                vm.inputed.username ='';
                vm.inputed.password = '';
                // vm.inputed = '';
              } else {

              }
            });
    };
}
