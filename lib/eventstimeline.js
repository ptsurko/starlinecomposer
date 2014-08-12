(function() {
  if (!d3.starline) {
    d3.starline = {};
  }
  d3.starline.eventsTimeline = function(options) {
    var timeline = d3.starline.timeline();
    var dispatch = d3.dispatch('selected');
    var cfg = {
      w: 800,
      h: 50,
      extentWidth: 10,
      showCurrentTime: true
    };

    var selectedEventEl;
    var scale = timeline.getScale();
    var g;
    var events;
    function initialize(parentEl) {
      g = parentEl;
      g.call(timeline);

      if (cfg.showCurrentTime) {
        g.selectAll(".current")
          .data([{date: new Date()}])
          .enter()
            .append('svg:g')
            .append('svg:line')
            .attr('class', 'current')
            .attr('x1', function(d) { return scale(d.date); })
            .attr('x2', function(d) { return scale(d.date); })
            .attr('y2', cfg.h);
      }
    }

    initialize.setEvents = function(events) {
      events = events;
      var domain = scale.domain();
      var filteredEvents = events.filter(function(event) {
        return event.date >= domain[0] && event.date <= domain[1];
      });

      var eventSelection = g.selectAll(".event")
        .data(filteredEvents, function(d) { return d.date; });

      var eventEnterSelection = eventSelection.enter()
        .append('svg:g')
        .attr('class', 'event');

      eventEnterSelection
        .append('svg:line')
        .attr('class', 'event-line')
        .attr('y2', cfg.h);

      eventEnterSelection
        .append('svg:rect')
        .attr('class', 'extent')
        .attr('width', cfg.extentWidth)
        .attr('height', cfg.h)
        .on('click', function(e) {
          if (selectedEventEl) {
            selectedEventEl.select('.event-line')
              .attr('class', 'event-line');
          }
          selectedEventEl = d3.select(this.parentNode);
          selectedEventEl.select('.event-line')
            .attr('class', 'event-line selected');

          dispatch.selected({data: e});
        });

      eventSelection.select('.event-line')
        .attr('x1', function(d) { return scale(d.date); })
        .attr('x2', function(d) { return scale(d.date); });
      eventSelection.select('.extent')
        .attr('x', function(d) { return scale(d.date) - cfg.extentWidth / 2; });

      if (cfg.showCurrentTime) {
        g.select('.current')
          .attr('x1', function(d) { return scale(d.date); })
          .attr('x2', function(d) { return scale(d.date); });
      }

      eventSelection.exit()
        .remove()

      timeline.onZoom(function(scale) {
        initialize.setEvents(events);
      });
    }

    initialize.on = function(eventType, callback) {
      dispatch.on(eventType, callback);
      return initialize;
    }

    return initialize;
  };
}());
