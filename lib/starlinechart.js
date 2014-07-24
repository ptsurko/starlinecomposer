(function() {
  d3.rayChart = function(options) {
    var cfg = {
     radius: 1,
     w: 400,
     h: 400,
     // factor: 1,
     // factorLegend: .85,
     // levels: 3,
     maxValue: 0,
     radians: 2 * Math.PI,
     // opacityArea: 0.5,
     // ToRight: 5,
     // TranslateX: 80,
     // TranslateY: 30,
     // ExtraWidthX: 300,
     // ExtraWidthY: 100,
     color: d3.scale.category10()
    };

    //var d = generateData(templateData, 3);

    function draw(g) {
      var data = g.datum();
      var allAxis = data[0].map(function(i, j){return i.axis});
      var total = allAxis.length;
      var radius = Math.min(cfg.w / 2, cfg.h / 2);
      //var Format = d3.format('%');
      // d3.select(id).select("svg").remove();

      var axis = g.selectAll(".axis")
          .data(allAxis)
          .enter()
          .append("g")
          .attr("class", "axis");

      axis.append("line")
        .attr("x1", cfg.w/2)
        .attr("y1", cfg.h/2)
        .attr("x2", function(d, i) {
          return radius * (1 - Math.sin(i * cfg.radians / total));
        })
        .attr("y2", function(d, i) {
          return radius * (1 - Math.cos(i * cfg.radians / total));
        })
        .attr("class", "line")
        .style("stroke", "grey")
        .style("stroke-width", ".1px");

      axis.append("text")
        .attr("class", "legend")
        .text(function(d) {return d;})
        .style("font-family", "sans-serif")
        .style("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("dy", "1.5em")
        .attr("transform", function(d, i){return "translate(0, -10)"})
        .attr("x", function(d, i) {return radius * (1 - Math.sin(i * cfg.radians / total)) - 40 * Math.sin(i * cfg.radians / total);})
        .attr("y", function(d, i) {return radius * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total);});

      cfg.maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){
        return d3.max(i.map(function(o){
          return o.value;
        })) || 0
      }));

      var scale = d3.scale.linear()
        .domain([0, cfg.maxValue])
        .range([0, radius]);

      var lineSelection = g.selectAll('.res')
        .data(prepareData(data), function(d) {return d.$$groupIndex + d.axis;});

      lineSelection
        .enter()
        .append('g')
        .attr('class', 'res')
        .attr("data-id", function(d) { return d.axis})
          .append("line")
          .attr("x1", cfg.w/2)
          .attr("y1", cfg.h/2)
          .attr("x2", cfg.w/2)
          .attr("y2", cfg.h/2)
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
              return cfg.h / 2 + scale(d.value) * Math.cos(i * cfg.radians / total);
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
