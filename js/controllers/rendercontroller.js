angular.module('StarLineComposer')
  .controller('RenderController', ['$scope', 'VisualisationService', 'EventsService', function($scope, VisualisationService, EventsService) {
    $scope.events = EventsService.getEvents();
    $scope.visualisation = VisualisationService.getVisualisation();
    $scope.selectedEvent = null;
    $scope.chartData = [];

    var visualisation = VisualisationService.getVisualisation();

    $scope.$watch('selectedEvent', function(newEvent, oldEvent) {

      if (newEvent) {
        $scope.chartData = [];
        for(var i = 0; i < visualisation.axises.length; i++) {
          var axis = visualisation.axises[i];
          $scope.chartData.push({
            axis: axis.name,
            value: newEvent.getValue(axis.id) || axis.expectedValue
          });
        }
      }

      // $scope.chartData = newAxises.map(function(axis) {
      //   return {
      //     axis: axis.name,
      //     value: Math.random()
      //   };
      // });

    }, true);
  }]);
