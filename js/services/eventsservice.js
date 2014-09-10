angular.module('StarLineComposer')
  .service('EventsService', function() {
    var date = new Date();
    var year = date.getYear() + 1900;
    var month = date.getMonth();
    var day = date.getDate();
    var events = [
      new Event(new Date(year, month, day, Math.floor((Math.random() * 24)))),
      new Event(new Date(year, month, day, Math.floor((Math.random() * 24)))),
      new Event(new Date(year, month, day, Math.floor((Math.random() * 24)))),
      new Event(new Date(year, month, day, Math.floor((Math.random() * 24)))),
      new Event(new Date(year, month, day, Math.floor((Math.random() * 24)))),
      new Event(new Date(year, month, day, Math.floor((Math.random() * 24))))
    ];

    this.getEvents = function() {
      return events;
    };

    this.addEvent = function(eventToAdd) {
      events.push(eventToAdd);
    };

    this.saveEvent = function(event) {

    };
  });
