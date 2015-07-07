'use strict';

angular.module('mytodoApp')
  .controller('MainCtrl', ['$scope', 'localStorageService', 'SortService', function ($scope, localStorageService, SortService) {

    var todosInStore = localStorageService.get('todos');
    $scope.sortingSetting = {by: '', direction: ''}

    $scope.todos = todosInStore || [];

    $scope.$watch('todos', function () {
        SortService.setItems($scope.todos);
        localStorageService.add('todos', $scope.todos);
    }, true);

    // Uncomment if you are disabling persistence
    //$scope.todos = [];
    $scope.init = function () {
      $scope.todo = {name: '', time: '00:00', priority: $scope.todos.length};
    }();

    $scope.addTodo = function () {
      $scope.todos.push($scope.todo);
      $scope.todo = {name: '', time: '00:00', priority: $scope.todos.length};
    };

    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };

    // $scope.sortAllBy = function (property) {
    //   if ($scope.sortingSetting.by == property){
    //     $scope.sortingSetting.property = ($scope.sortingSetting.property == 'asc' ? 'desc' : 'asc')
    //   }else{
    //     $scope.sortingSetting = {by: property, direction: 'asc'}
    //   }

    //   $scope.sortAll();
    // };


    $scope.removeAll = function () {
      $scope.todos = [];

    };

    $scope.sortBy = function(property){
      SortService.sortBy(property);
    }

    $scope.getSorterImage = function(property){       
      if (property == SortService.property){
        var imageName = (SortService.direction == 'asc' ? 'up' : 'down');
        return '/images/' + imageName + '.jpeg' ;
      }
        
      return undefined;
    }

  }]);
