angular.module('StarLineComposer')
  .controller('EventsController', ['$scope', 'VisualisationService', 'EventsService', function($scope, VisualisationService, EventsService) {
    var visualisation = VisualisationService.getVisualisation();

    $scope.events = EventsService.getEvents();

    $scope.onAddDate = function(date) {
      var newEvent = new Event(date, visualisation);
      EventsService.addEvent(newEvent);
    };
  }]);
