angular.module('StarLineComposer')
  .controller('VisualisationController', ['$scope', function($scope) {
    var axisIndex = 0;
    $scope.name = 'Basic 10 Points';
    $scope.graduatedScale = false;
    $scope.axises = [];
    for(var i = 0; i < 5; i++) {
      $scope.axises.push({
        name: 'Lorem Ipsum ' + axisIndex++,
        scale: '10',
        scaleEnabled: false,
        expectedValue: 5,
        value: Math.random()
      });
    }
    $scope.addAxisLine = function() {
      $scope.axises.push({
        name: 'Lorem Ipsum ' + axisIndex++,
        scale: '10',
        scaleEnabled: false,
        expectedValue: 5,
        value: Math.random()
      });
    }
    $scope.removeAxisLine = function(axis) {
      var index = $scope.axises.indexOf(axis);
      $scope.axises.splice(index, 1);
    };

    $scope.$watch('axises', function(newAxises, oldAxises) {
      $scope.chartData = newAxises.map(function(axis) {
        return {
          axis: axis.name,
          value: axis.value
        }
      })
    }, true);
  }]);
