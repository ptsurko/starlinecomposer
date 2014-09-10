angular.module('StarLineComposer')
  .controller('VisualisationController', ['$scope', 'VisualisationService', function($scope,  VisualisationService) {
    var axisIndex = 0;
    $scope.visCfg = VisualisationService.getVisualisation();

    $scope.addAxisLine = function() {
      $scope.visCfg.addAxis();
    }
    $scope.removeAxisLine = function(axis) {
      $scope.visCfg.removeAxis(axis);
    };

    $scope.$watch('visCfg.axises', function(newAxises, oldAxises) {
      //TODO: fix to save values
      $scope.chartData = newAxises.map(function(axis) {
        return {
          axis: axis.name,
          value: Math.random()
        };
      });

      VisualisationService.saveVisualisation($scope.visCfg);
    }, true);
  }]);
