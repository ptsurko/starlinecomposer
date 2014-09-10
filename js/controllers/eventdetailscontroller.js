angular.module('StarLineComposer')
  .controller('EventDetailsController', ['$scope', 'VisualisationService', 'EventsService', function($scope, VisualisationService, EventsService) {
    var visualisation = VisualisationService.getVisualisation();
    var event = $scope.event;

    $scope.event = {values: []};
    for(var i = 0; i < visualisation.axises.length; i++) {
      var axis = visualisation.axises[i];
      $scope.event.values.push({
        axisId: axis.id,
        axisName: axis.name,
        value: event.getValue(axis.id) || axis.expectedValue
      });
    }

    function findExistingAxis(oldAxises, axisName) {
      for(var i = 0; i < oldAxises.length; i++) {
        if (oldAxises[i].name == axisName) {
          return oldAxises[i];
        }
      }
      return null;
    }

    $scope.$watch('event', function(newData, oldData) {
      for(var i = 0; i < newData.values.length; i++) {
        if (newData.values[i].value != oldData.values[i].value) {
          event.setValue(newData.values[i].axisId, newData.values[i].value);
        }
      }
    }, true);
  }]);
