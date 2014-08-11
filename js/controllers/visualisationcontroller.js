angular.module('StarLineComposer')
  .controller('VisualisationController', ['$scope', function($scope) {
    var axisIndex = 0;
    $scope.visCfg.name = 'Basic 10 Points';
    $scope.visCfg.graduatedScale = false;
    $scope.visCfg.axises = [];
    for(var i = 0; i < 5; i++) {
      $scope.visCfg.axises.push({
        name: 'Lorem Ipsum ' + axisIndex++,
        scale: '10',
        scaleEnabled: false,
        expectedValue: 5,
        value: Math.random()
      });
    }
    $scope.addAxisLine = function() {
      $scope.visCfg.axises.push({
        name: 'Lorem Ipsum ' + axisIndex++,
        scale: '10',
        scaleEnabled: false,
        expectedValue: 5,
        value: Math.random()
      });
    }
    $scope.removeAxisLine = function(axis) {
      var index = $scope.visCfg.axises.indexOf(axis);
      $scope.visCfg.axises.splice(index, 1);
    };

    $scope.$watch('visCfg.axises', function(newAxises, oldAxises) {
      $scope.chartData = newAxises.map(function(axis) {
        return {
          axis: axis.name,
          value: axis.value
        }
      })
    }, true);
  }]);
