var mainApp = angular.module("mainApp", []);

mainApp.factory('WeatherApiService', function($http) {
    var factory = {};

    factory.requestWeatherByCity = function(town){
        var URL = 'http://api.openweathermap.org/data/2.5/weather?';
  
        var request = {
            method: 'GET',
            url: URL,
            params: {
                q: town,
                // mode: 'json',
                // units: 'metric',
                // cnt: '7',
                appid: '339a3ec6eccfd50aae8cf244fde9fb87'
            }
        };
        return $http(request);
    }

    return factory;
});

mainApp.service('WeatherService', function(WeatherApiService){

    this.getWeatherByCity = function(town){
        return WeatherApiService.requestWeatherByCity(town);
    }
});

mainApp.controller('weatherController', function($scope, WeatherService) {

    $scope.square = function() {
        WeatherService.getWeatherByCity($scope.number).then(function(response) {
            console.log("Gopi Krishna" + response.data);// has more fields!!!
            
            $scope.city = response.data.name;
            $scope.temp = response.data.main.temp;
            $scope.wind = response.data.wind.speed;
            $scope.myVar = "http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png";   
            $scope.code = response.data.weather[0].description;
            $scope.hum = response.data.main.humidity;          
                     
        }, function(response){
            alert("Invalid city name, Please enter correct one...");
        })
        
    }
});