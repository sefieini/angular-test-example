'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('mytodoApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, localStorageService, SortService) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope, localStorageService: localStorageService
    });
  }));



  it('#init', function () {
    // Wrong :
    //expect(scope.todo).toBe({name: '', time: '00:00', priority: 0});

    // Right :
    testUtils.expectAlike(scope.todo, {name: '', time: '00:00', priority: 0})
    expect(scope.todos.length).toBe(0);
      //scope.sortingSetting.. ?
  });

});
