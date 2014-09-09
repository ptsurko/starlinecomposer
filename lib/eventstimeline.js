(function() {
  if (!d3.starline) {
    d3.starline = {};
  }
  d3.starline.eventsTimeline = function(options) {
    var timeline = d3.starline.timeline();
    var dispatch = d3.dispatch('selected');
    var cfg = {
      h: 80,
      extentWidth: 10,
      showCurrentTime: true
    };

    var selectedEventEl;

    function initialize(g) {
      g.each(function() {
        var g = d3.select(this);
        var scale = timeline.scale();

        var eventsTimeline = g.selectAll('.events-timeline');
        var eventsTimelineEnter = eventsTimeline.data([0])
          .enter()
          .append('svg:g')
          .attr('class', 'events-timeline');

        eventsTimeline
          .call(timeline);

        var currentSelection;
        if (cfg.showCurrentTime) {
          currentSelection = eventsTimeline.selectAll('.current');
          currentSelection.data([{date: new Date()}])
            .enter()
              .append('svg:g')
              .attr('class', 'current')
              .append('svg:line')
              .attr('class', 'current-line')
              .attr('x1', function(d) { return scale(d.date); })
              .attr('x2', function(d) { return scale(d.date); })
              .attr('y2', cfg.h);
        }

        var events = g.data() ? g.data()[0] : [];
        var scale = timeline.scale();
        var domain = scale.domain();
        var filteredEvents = events.filter(function(event) {
          return event.date >= domain[0] && event.date <= domain[1];
        });

        var eventSelection = eventsTimeline.selectAll(".event")
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
          .style('fill', 'none')
          .on('click', function(e) {
            if (selectedEventEl) {
              selectedEventEl.select('.event-line')
                .attr('class', 'event-line');
            }
            selectedEventEl = d3.select(this.parentNode);
            selectedEventEl.select('.event-line')
              .attr('class', 'event-line selected');

            dispatch.selected({data: e, element: selectedEventEl[0][0]});
          });

        eventSelection.select('.event-line')
          .attr('x1', function(d) { return scale(d.date); })
          .attr('x2', function(d) { return scale(d.date); });
        eventSelection.select('.extent')
          .attr('x', function(d) { return scale(d.date) - cfg.extentWidth / 2; });

        if (cfg.showCurrentTime) {
          currentSelection.select('.current-line')
            .attr('x1', function(d) { return scale(d.date); })
            .attr('x2', function(d) { return scale(d.date); });
        }

        eventSelection.exit()
          .remove();
      });
    }

    initialize.getSelectedEventElement = function() {
      return selectedEventEl[0][0];
    }

    initialize.on = function(eventType, callback) {
      dispatch.on(eventType, callback);
      return initialize;
    };

    initialize.scale = function(x) {
      if (!arguments.length) return timeline.scale();
      timeline.scale(x);
      return initialize;
    };

    return initialize;
  };
}());
