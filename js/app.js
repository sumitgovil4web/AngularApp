angular.module('profileapp', ['ngRoute', 'firebase'])
.controller('MainController', ['$log', '$scope', function($log, $scope){
  $log.info('MainController initiated');
}])
.controller('ServicesController', ['$log', '$scope', 'ServicesService', function($log, $scope, ServicesService){
  $log.info('ServicesController initiated');
  ServicesService.getServices().then(function(response){
    $log.info('reading data from services service');
    $scope.services = response.data;
      $log.debug('From Services', $scope.services);
  });

  $scope.displayDetails = function(){
    $log.info('Something clicked');
  };

}])
.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'templates/home.html'
  })
  .when('/about', {
    templateUrl: 'templates/aboutme.html'
  })
  .when('/services', {
    templateUrl: 'templates/services.html',
    controller: 'ServicesController',
    controllerAs: 'servctrl'
  })
  .when('/contacts', {
    templateUrl: 'templates/contacts.html',
    controller: 'ContactsCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
}])
.service('ServicesService', ['$http', '$q', function($http, $q){
  return {
    getServices: function(){
      var list = $q.defer();
      $http.get('../json/services.json').then(function(response){
        list.resolve(response);
      }, function(response){
        list.reject(response);
      }
    );
    return list.promise;
 }
};
}]);
