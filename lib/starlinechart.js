(function() {
  d3.rayChart = function(options) {
    var cfg = {
     radius: 1,
     w: 400,
     h: 400,
     levels: 3,
     maxValue: 0,
     radians: 2 * Math.PI,
     color: d3.scale.category20()
    };

    function draw(g) {
      var data = prepareData(g.datum());
      var total = data.length;
      var radius = Math.min(cfg.w / 2, cfg.h / 2);

      cfg.maxValue = Math.max(cfg.maxValue, d3.max(data, function(o){
        return o.value;
      }) || 0);

      var scale = d3.scale.linear()
        .domain([0, cfg.maxValue])
        .range([0, radius]);

      var axisScale = d3.scale.linear()
        .domain([0, cfg.maxValue])
        .range([radius, 0]);

      var xAxis = d3.svg.axis()
        .scale(axisScale)
        .orient("right")
        .ticks(3);

      var axisSelection = g.selectAll(".axis")
        .data(data, function(d) {return d.$$groupIndex + d.axis;});

      var axisEnterSelection = axisSelection.enter()
        .append("g")
        .attr("transform", function(d, i) {
          return d3.svg.transform().translate(cfg.w / 2, 0)();
        })
        .attr("class", "axis");

      axisEnterSelection
        .append("g")
        .attr("class", "axis-line")
        .call(xAxis);

      axisSelection
        .select(".axis-line")
        .call(xAxis)
          .selectAll(".tick")
          .each(function(d, i) {
              if (d ==0) {
                  this.remove();
              }
          });

      axisEnterSelection
        .append("text")
        .attr("class", "legend")
        .text(function(d) {return d.axis;})
        .style("font-family", "sans-serif")
        .style("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("dy", "1.5em")
        .attr("transform", function(d, i){return "translate(0, -10)"});

      axisSelection.select('.legend')
        .transition()
        .attr("x", function(d, i) {return radius * Math.sin(i * cfg.radians / total) + 40 * Math.sin(i * cfg.radians / total);})
        .attr("y", function(d, i) {return cfg.h / 2 - radius * Math.cos(i * cfg.radians / total) - 20 * Math.cos(i * cfg.radians / total);});

      axisSelection
        .select(".axis-line")
        .transition()
        .attr("transform", function(d, i) {
          return d3.svg.transform()
            .rotate((i * cfg.radians / total) * 180 / Math.PI, 0, cfg.w / 2)();
        });

      axisSelection.exit()
        .remove();

      // var axisSelection = g.selectAll(".axis")
      //   .data(data, function(d) {return d.$$groupIndex + d.axis;});
      //
      // var axisLineGroupSelection = axisSelection.enter()
      //   .append("g")
      //   // .attr("transform", function(d, i) {
      //   //   return d3.svg.transform().translate(cfg.w / 2, 0)();
      //   // })
      //   .attr("class", "axis");
      //
      //
      // axisLineGroupSelection
      //   .append("line")
      //   .attr("x1", cfg.w/2)
      //   .attr("y1", cfg.h/2)
      //   .attr("class", "line")
      //   .style("stroke", "grey")
      //   .style("stroke-width", ".1px");
      //
      // axisSelection
      //   .select('line')
      //   .transition()
      //   .attr("x2", function(d, i) {
      //     return cfg.w / 2 + radius * Math.sin(i * cfg.radians / total);
      //   })
      //   .attr("y2", function(d, i) {
      //     return cfg.h / 2 - radius * Math.cos(i * cfg.radians / total);
      //   })
      //
      // axisLineGroupSelection.append("text")
      //   .attr("class", "legend")
      //   .text(function(d) {return d.axis;})
      //   .style("font-family", "sans-serif")
      //   .style("font-size", "11px")
      //   .attr("text-anchor", "middle")
      //   .attr("dy", "1.5em")
      //   .attr("transform", function(d, i){return "translate(0, -10)"});
      //
      // axisSelection.select('text')
      //   .transition()
      //   .attr("x", function(d, i) {return cfg.w / 2 + radius * Math.sin(i * cfg.radians / total) + 40 * Math.sin(i * cfg.radians / total);})
      //   .attr("y", function(d, i) {return cfg.h / 2 - radius * Math.cos(i * cfg.radians / total) - 20 * Math.cos(i * cfg.radians / total);});
      //
      // axisSelection.exit()
      //   .remove();

      var lineSelection = g.selectAll('.line-group')
        .data(data, function(d) {return d.$$groupIndex + d.axis;});

      lineSelection
        .enter()
        .append('g')
        .attr('class', 'line-group')
        .attr("data-id", function(d) { return d.axis})
          .append("line")
          .attr("x1", cfg.w/2)
          .attr("y1", cfg.h/2)
          .attr("class", "line")
          .style("stroke", function(d) {return cfg.color(d.$$groupIndex);})
          .style("stroke-width", function(d) {return (d.$$groupIndex + 1) * 2 + 'px';});

      lineSelection
        .select('line')
        .transition()
        .attr("x2", function(d, i) {
          return cfg.w / 2 + scale(d.value) * Math.sin(i * cfg.radians / total);
        })
        .attr("y2", function(d, i) {
          return cfg.h / 2 - scale(d.value) * Math.cos(i * cfg.radians / total);
        });

      lineSelection.exit().remove();
    };

    function prepareData(data) {
      return d3.merge(data.map(function(group, groupIndex) {
        return group.map(function(item, index) {
          return {
            axis: item.axis,
            value: item.value,
            $$groupIndex: groupIndex
          };
        });
      }));
    };

    return draw;
  };
}());
