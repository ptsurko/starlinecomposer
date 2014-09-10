angular.module('StarLineComposer')
  .controller('EventsController', ['$scope', 'EventsService', function($scope, EventsService) {
    $scope.events = EventsService.getEvents();

    $scope.onAddDate = function(date) {
      var newEvent = new Event(date);
      EventsService.addEvent(newEvent);
    };
  }]);
