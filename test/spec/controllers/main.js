'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('todoApp'));

  var MainCtrl,
    localStorageService,
    store,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _localStorageService_) {
    store = [];
    scope = $rootScope.$new();
    localStorageService = _localStorageService_;

    //mock localStorageService get/add
    spyOn(localStorageService, 'get').andCallFake(function(key){
        return store[key];
    });

    spyOn(localStorageService, 'add').andCallFake(function(key, val){
        store[key] = val;
    });

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      localStorageService: localStorageService
    });
  }));

  it('should have no items to start', function(){
      expect(localStorageService.get).toHaveBeenCalledWith('todos');
      expect(scope.todos.length).toBe(0);
  });

  it('should add items to the list', function(){
      scope.todo = 'test 1';
      scope.addTodo();
      scope.$digest();
      expect(localStorageService.add).toHaveBeenCalledWith('todos', jasmine.any(String));
      expect(scope.todos.length).toBe(1);
  });

  it('should remove items to the list', function(){
      scope.todo = 'Test 1';
      scope.addTodo();
      scope.$digest();
      //reset call counter
      localStorageService.add.reset();

      scope.removeTodo(0);
      scope.$digest();
      expect(localStorageService.add).toHaveBeenCalledWith('todos', jasmine.any(String));
      expect(scope.todos.length).toBe(0);
  });
});
