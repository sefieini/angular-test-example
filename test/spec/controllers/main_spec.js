'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('mytodoApp'));

    var MainCtrl, scope, SortService, todoInit = {name: '', time: '00:00', priority: 0};
    var newTodo = function(num){
        return angular.extend(angular.extend({}, todoInit), {name: 'name' + num})
    };

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, localStorageService, _SortService_) {
        scope = $rootScope.$new();
        SortService = _SortService_;
        MainCtrl = $controller('MainCtrl', {
            $scope: scope, localStorageService: localStorageService
        });
    }));
    
    
    // Approach 1
    it('#init', function () {

        testUtils.expectAlike(scope.todo, todoInit);
        expect(scope.todos.length).toBe(0);
        testUtils.expectAlike(scope.sortingSetting, {by: '', direction: ''})
    });

    it('#addTodo', function () {
        var uniqTodo = {name: 'uniq name', time: '12:34', priority: 1234};
        scope.todo = uniqTodo;

        expect(scope.todos.length).toBe(0);
        scope.addTodo();

        expect(scope.todos.length).toBe(1);
        testUtils.expectAlike(scope.todos[0], uniqTodo);
        var todoAfterAdding = angular.copy(todoInit);
        todoAfterAdding.priority = 1;
        testUtils.expectAlike(scope.todo, todoAfterAdding);

        scope.addTodo();
        expect(scope.todos.length).toBe(2);
        todoAfterAdding.priority = 2;
        testUtils.expectAlike(scope.todo, todoAfterAdding);
    });

    it('#removeTodo', function () {

        scope.todos = [newTodo(1), newTodo(2), newTodo(3)];

        expect(scope.todos.length).toBe(3);
        expect(scope.todos[1].name).toBe('name2');
        scope.removeTodo(1);
        expect(scope.todos[1].name).not.toBe('name2');

        expect(scope.todos[0].name).toBe('name1');
        scope.removeTodo(0);
        expect(scope.todos[0].name).not.toBe('name1');
    });

    it('#removeAll', function () {
        scope.todos = [newTodo(1), newTodo(2), newTodo(3)];

        expect(scope.todos.length).toBe(3);
        scope.removeAll();
        expect(scope.todos.length).toBe(0);
    });

    it('#sortBy', function () {
        spyOn(SortService, 'sortBy')
        scope.sortBy('data');
        expect(SortService.sortBy).toHaveBeenCalledWith('data');
    });

    describe('#getSorterImage', function () {
        beforeEach(function(){
            SortService.property = 'property1';
            SortService.direction = 'asc';
        })

        it('should turn away direction if same direction', function(){
            expect(scope.getSorterImage('property1')).toBe('/images/up.jpeg');
            SortService.direction = 'desc';
            expect(scope.getSorterImage('property1')).toBe('/images/down.jpeg');
        })

        it('should turn return undefined for a different property regardless direction', function(){
            expect(scope.getSorterImage('property2')).toBe(undefined);
            SortService.direction = 'desc';
            expect(scope.getSorterImage('property2')).toBe(undefined);
        })
    });




    // Approach 2
    var expectEmptyTodo = function(priority){
        priority = priority || 0;
        expect(scope.todo).toEqual({name: '', time: '00:00', priority: priority});
    }


    it('#init', function () {
        expectEmptyTodo();
        expect(scope.todos.length).toBe(0);
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
