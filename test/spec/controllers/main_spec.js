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

    var expectEmptyTodo = function(priority){
        priority = priority || 0;
        expect(scope.todo).toEqual({name: '', time: '00:00', priority: priority});
    }


  it('#init', function () {
    // Wrong :
    //expect(scope.todo).toBe({name: '', time: '00:00', priority: 0});

    // Right :
    expectEmptyTodo();
    expect(scope.todos.length).toBe(0);
      //scope.sortingSetting.. ?
  });

    it('#addTodo', function(){
        var todo = {name: 'test-name', time: '00:34', priority: 1234};
        scope.todo = todo;
        var currLength = scope.todos.length;
        scope.addTodo();
        expect(scope.todos.length).toBe(currLength + 1);
        expect(scope.todos[currLength]).toEqual(todo);
        expectEmptyTodo(1);
    })

    it('#removeTodo', function(){
        scope.todos = [{name: 'test-name', time: '00:34', priority: 1234}];
        spyOn(scope.todos, 'splice');
        scope.removeTodo(1324);
        expect(scope.todos.splice).toHaveBeenCalledWith(1324, 1);
    })

});
