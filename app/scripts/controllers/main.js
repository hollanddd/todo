'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('MainCtrl', function ($scope, localStorageService) {
    var todosInStore = localStorageService.get('todos');

    $scope.todos = todosInStore && todosInStore.split('\n') || [];

    $scope.$watch('todos', function(){
        localStorageService.add('todos', $scope.todos.join('\n'));
    }, true);

    $scope.addTodo = function() {
        if ($scope.todos.indexOf($scope.todo) === -1) {
            $scope.todos.push($scope.todo);
        } else {
            window.alert($scope.todo + ' already exists in todo list');
        }
        $scope.todo = '';
    };

    $scope.removeTodo = function(index){
        $scope.todos.splice(index,1);
    };
  });
