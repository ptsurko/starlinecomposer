angular.module('StarLineComposer')
  .controller('VisualisationController', ['$scope', function($scope) {
    $scope.name = 'Basic 10 Points';
    $scope.graduatedScale = false;
    $scope.axises = [];
    for(var i = 0; i < 10; i++) {
      $scope.axises.push({
        name: 'Lorem Ipsum 1',
        scale: '10',
        expectedValue: 5
      });
    }
  }]);
