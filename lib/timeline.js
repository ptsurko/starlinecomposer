(function() {
  if (!d3.starline) {
    d3.starline = {};
  }
  d3.starline.timeline = function(options) {
    var cfg = {
      h: 80,
      dateOffset: 5,
      innerTickSize: 30,
      textPadding: 3,
      tickCount: 6
    };
    var scale;

    function timeline(g) {
      g.each(function() {
        var g = d3.select(this);
        var timeline = g.selectAll('.timeline').data([0]);
        timeline.enter()
          .append('svg:g')
          .attr('class', 'timeline');

        var ticks = scale.ticks(cfg.tickCount);
        var tickFormat = scale.tickFormat.call(scale, cfg.tickCount);
        var tick = timeline.selectAll('.tick').data(ticks, scale);
        var tickEnter = tick.enter()
          .insert("g", ".domain").attr("class", "tick");
        var tickExit = tick.exit().remove();
        var tickUpdate = tick.order();

        tickEnter.append('svg:line');
        tickEnter.append('svg:text');

        var lineEnter = tickEnter.select('line');
        var lineUpdate = tickUpdate.select('line');

        var textEnter = tickEnter.select('text');
        var textUpdate = tickUpdate.select('text');
        var text = tick.select('text').text(tickFormat);

        lineEnter.attr('y2', cfg.innerTickSize);
        lineUpdate.attr('y2', cfg.innerTickSize + 20)
          .attr('x1', scale)
          .attr('x2', scale);

        textEnter.attr('y', cfg.innerTickSize + cfg.textPadding)
          .attr("dy", ".71em");
        textUpdate.attr('y', cfg.innerTickSize + cfg.textPadding)
          .attr('x', function(d) { return scale(d) + cfg.textPadding;});


        var range = scale.range();
        var path = timeline.selectAll('.border').data([0]);
        var pathEnter = path.enter()
          .append('svg:path')
          .attr('class', 'border')
          .style('fill', 'none');

        path.attr('d', 'M ' + range[0] + ' 0 H ' + range[1] + ' V ' + cfg.h + ' H ' + range[0] + ' V 0');


        var pathCenter = timeline.selectAll('.center').data([0]);
        var pathCenterEnter = pathCenter.enter()
          .append('svg:path')
          .attr('class', 'center')
          .style('fill', 'none');

        pathCenter.attr('d', 'M ' + range[0] + ' ' + cfg.innerTickSize + ' H ' + range[1]);
      });
    }

    timeline.scale = function(x) {
      if (!arguments.length) return scale;
      scale = x;
      return timeline;
    };

    timeline.tickCount = function(x) {
      if (arguments.length) return cfg.tickCount;
      cfg.tickCount = x;
      return timeline;
    }

    timeline.height = function() {
      if (!arguments.length) return cfg.h;
      cfg.h = x;
      return timeline;
    };

    return timeline;
  };
}());
