angular.module('StarLineComposer')
  .service('EventsService', ['VisualisationService', function(VisualisationService) {
    var visualisation = VisualisationService.getVisualisation();
    var date = new Date();
    var year = date.getYear() + 1900;
    var month = date.getMonth();
    var day = date.getDate();
    var events = [
      new Event(new Date(year, month, day, Math.floor((Math.random() * 24))), visualisation),
      new Event(new Date(year, month, day, Math.floor((Math.random() * 24))), visualisation),
      new Event(new Date(year, month, day, Math.floor((Math.random() * 24))), visualisation),
      new Event(new Date(year, month, day, Math.floor((Math.random() * 24))), visualisation),
      new Event(new Date(year, month, day, Math.floor((Math.random() * 24))), visualisation),
      new Event(new Date(year, month, day, Math.floor((Math.random() * 24))), visualisation)
    ];

    this.getEvents = function() {
      return events;
    };

    this.addEvent = function(eventToAdd) {
      events.push(eventToAdd);
    };
  }]);
