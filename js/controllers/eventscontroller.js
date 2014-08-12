angular.module('StarLineComposer')
  .controller('EventsController', ['$scope', function($scope) {
    $scope.events = [
      {date: new Date('2014-08-10'), axises: []},
      {date: new Date('2014-08-20'), axises: []},
      {date: new Date('2014-08-14'), axises: []},
      {date: new Date('2014-08-18'), axises: []},
      {date: new Date('2014-08-16'), axises: []},
      {date: new Date('2014-08-25'), axises: []},
      {date: new Date('2014-08-27'), axises: []}
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
