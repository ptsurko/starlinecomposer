angular.module('StarLineComposer')
  .controller('EventsController', ['$scope', function($scope) {
    var date = new Date();
    var year = date.getYear() + 1900;
    var month = date.getMonth();
    var day = date.getDate();

    $scope.events = [
      {date: new Date(year, month, day, Math.floor((Math.random() * 24))), axises: []},
      {date: new Date(year, month, day, Math.floor((Math.random() * 24))), axises: []},
      {date: new Date(year, month, day, Math.floor((Math.random() * 24))), axises: []},
      {date: new Date(year, month, day, Math.floor((Math.random() * 24))), axises: []},
      {date: new Date(year, month, day, Math.floor((Math.random() * 24))), axises: []},
      {date: new Date(year, month, day, Math.floor((Math.random() * 24))), axises: []},
    ];
    $scope.axises = [];

    $scope.onSelectDate = function(date) {
      $scope.events.push({
        date: date,
        axises: $scope.visCfg.axises.map(function(axis) {
          return {
            name: axis.name,
            value: axis.expectedValue
          };
        })
      });
    };

    $scope.$watch('visCfg.axises', function(newData, oldData) {
      for(var i = 0; i < $scope.events.length; i++) {
        var oldAxises = $scope.events[i].axises;
        $scope.events[i].axises = newData.map(function(axis) {
          var oldAxis = findExistingAxis(oldAxises, axis.name);
          return {
            name: axis.name,
            value: (oldAxis && oldAxis.value) || axis.expectedValue
          };
        });
      }
    }, true);

    function findExistingAxis(oldAxises, axisName) {
      for(var i = 0; i < oldAxises.length; i++) {
        if (oldAxises[i].name == axisName) {
          return oldAxises[i];
        }
      }
      return null;
    }
  }]);
