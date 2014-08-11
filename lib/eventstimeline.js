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
      extentWidth: 10
    };
    var selectedEventEl;
    var scale = timeline.getScale();
    var g;
    function initialize(parentEl) {
      g = parentEl;
      g.call(timeline);
    }

    initialize.setEvents = function(events) {
      var eventEnterSelection = g.selectAll(".event")
        .data(events, function(d) { return d.date; })
        .enter()
          .append('svg:g');

      eventEnterSelection
        .append('svg:line')
        .attr('class', 'event')
        .attr('x1', function(d) { return scale(d.date); })
        .attr('x2', function(d) { return scale(d.date); })
        .attr('y2', cfg.h);

      eventEnterSelection
        .append('svg:rect')
        .attr('class', 'extent')
        .attr('x', function(d) { return scale(d.date) - cfg.extentWidth / 2; })
        .attr('width', cfg.extentWidth)
        .attr('height', cfg.h)
        .on('click', function(e) {
          if (selectedEventEl) {
            selectedEventEl.select('.event')
              .attr('class', 'event');
          }
          selectedEventEl = d3.select(this.parentNode);
          selectedEventEl.select('.event')
            .attr('class', 'event selected');

          dispatch.selected({data: e});
        });

      timeline.onZoom(function(scale) {
        g.selectAll('.event')
          .attr('x1', function(d) { return scale(d.date); })
          .attr('x2', function(d) { return scale(d.date); });
        g.selectAll('.extent')
          .attr('x', function(d) { return scale(d.date) - cfg.extentWidth / 2; });
      });
    }

    initialize.on = function(eventType, callback) {
      dispatch.on(eventType, callback);
      return initialize;
    }

    return initialize;
  };
}());
