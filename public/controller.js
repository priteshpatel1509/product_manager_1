var app = angular.module('taskApp', []);
app.controller('TaskController', function($scope, $http) {
  // Load tasks
  $http.get('/api/gettasks').then(function(response) {
    $scope.tasks = response.data;
    console.log($scope.tasks);
  });
 
  // Add new task
  $scope.addTask = function() {
    $http.post('/api/addtasks', { taskName: $scope.newTaskName })
      .then(function(response) {
        $scope.tasks = response.data;
        console.log($scope.tasks);
        alert("New task added");
        $scope.newTaskName = "";
      });
  };

  // Update task
  $scope.updateTask = function(task) {
    
    $http.put('/api/updatetasks/' + task.taskID, task)
      .then(function(response) {
        $scope.tasks = response.data;
        alert("Data updated successfully");
      });
  };
  // Delete task
  $scope.deleteTask = function(taskID) {
    let res = confirm('Are you sure want to delete');
    if(res){
    $http.delete('/api/deletetasks/' + taskID)
      .then(function(response) {
      
       $scope.tasks = response.data;
       alert("Task deleted");
      });
    }
  };
});
