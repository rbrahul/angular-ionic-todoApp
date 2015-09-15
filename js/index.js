'use strict';
var myApp=angular.module("MyToDoApp",[]);

myApp.run(function($rootScope,storage){
  $rootScope.todos=[
    {task:"Meeting with Paul",status:'done'},
    {task:'Dinner with John Doe',status:'pending'},
    {task:'Watching Cinema at Star Cineplex',status:'Pending'}
  ];
  $rootScope.setDefaultS=function(){
    if(storage.getData('myToDo')==null){
    storage.setData('myToDo',JSON.stringify($rootScope.todos));
    }
  // $log.debug(storage.getData('myToDo'));
  };
  $rootScope.setDefaultS();
});


myApp.controller("ToDoCtlr",["$scope","$log","storage",function($scope,$log,storage){
  $scope.appname="Todo List"
  $scope.todos=[];
  $scope.assingToDo=function(){
    $scope.todos=JSON.parse(storage.getData('myToDo'));
    //$log.debug($scope.todos);
  };
  $scope.assingToDo();
 $scope.task="";
  
  $scope.changeStatus=function(index){
    storage.toggleStatus(index);
     $scope.assingToDo();
    $log.info($scope.todos);
  };
$scope.addToList=function(){

  if($scope.task!=""){
    var listitem={
    task:$scope.task,
    status:'pending'
  }
    storage.addToList(listitem);
 $scope.assingToDo();
    $scope.task="";
}
};
  $scope.deleteTask=function(index){
    storage.deleteToDo(index);
    $scope.todos.splice(index,1);
  }
}]);

myApp.factory("storage",function(){
  var _setData=function(key,val){localStorage.setItem(key,val);};
  var _getData=function(key){
    return localStorage.getItem(key); 
  };

  var _toggleStatus=function(index){
     var todos=JSON.parse(localStorage.getItem('myToDo'));
    if(todos[index].status=='done'){
      todos[index].status='pending';
    }else{
      todos[index].status='done';
    }
    localStorage.setItem('myToDo',JSON.stringify(todos));
  };
  var _addTodo=function(item){
    var todos=JSON.parse(localStorage.getItem('myToDo'));
    todos.unshift(item);
    localStorage.setItem('myToDo',JSON.stringify(todos));
  };
  var _deleteToDo=function(index){
    var todos=JSON.parse(localStorage.getItem('myToDo'));
    todos.splice(index,1);
     localStorage.setItem('myToDo',JSON.stringify(todos));
  };
  return {
    getData:_getData,
    setData:_setData,
    toggleStatus:_toggleStatus,
    addToList:_addTodo,
    deleteToDo:_deleteToDo
  };
});