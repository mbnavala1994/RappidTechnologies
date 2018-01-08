'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', function(openweathermapFactory, $http, $scope) {
	$scope.userDenied = false;
	$scope.location = {};

    // get the specified location by City Name
    // List of 2,000 cities are provided.
    $scope.requestCity = function() {
      console.log($scope.location);
      openweathermapFactory.getWeatherFromCitySearchByName({
        q: $scope.location.name,
        appid: "95fce1ea5c2190183b85f3e518de44cd"
      }).then(function(data) {
        $scope.position = data;

      }).catch(function(error) {
        console.log(error);
      })
    };

    

    var doWeather = function(position) {
      toastr.info('Going to fetch report', 'Hold on tight!');

      // get the weather report
      openweathermapFactory.getWeatherFromLocationByCoordinates({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        appid: "95fce1ea5c2190183b85f3e518de44cd"
      }).then(function(data) {
        $scope.position = data;
        console.log(data);
      }).catch(function(error) {
        console.log(error);
      })
    };

    $scope.requestCoord = function() {
      console.log($scope.location);
      doWeather($scope.location);
    }

    $http.get('./assets/city.list.json')
      .then(function(data) {
        $scope.cities = data.data;
      })
      .catch(function(error) {
        console.log(error);
     })
});