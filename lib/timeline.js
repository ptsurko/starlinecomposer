(function() {
  if (!d3.starline) {
    d3.starline = {};
  }
  d3.starline.timeline = function(options) {
    var cfg = {
      w: 800,
      h: 50
    };
    var xScale = d3.time.scale().range([0, cfg.w])
      .domain([new Date (2014, 7, 0), new Date(2014, 8, 0)]);
    var zoomCallback;

    function initialize(g) {
      var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(5);
      var zoom = d3.behavior.zoom()
        .x(xScale)
        .on("zoom", zoom);

      var svg = g.append("svg:g")
        .attr("width", cfg.w)
        .attr("height", cfg.h)
        .call(zoom)
        .on("dblclick.zoom", null);

      svg.append("svg:rect")
        .attr("class", "pane")
        .attr("width", cfg.w)
        .attr("height", cfg.h);

      svg.append("svg:g")
        .attr("class", "x axis");

      function draw() {
        svg.select(".x.axis").call(xAxis)
          .selectAll('text').attr('text-anchor', null);
      }

      function zoom() {
        draw();

        if (zoomCallback) {
          zoomCallback(xScale);
        }
      }

      draw();
    }

    initialize.getScale = function() {
      return xScale;
    };

    initialize.onZoom = function(callback) {
      zoomCallback = callback;
    };

    return initialize;
  };
}());
