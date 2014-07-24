angular.module('StarLineComposer')
  .directive('starlinechart', [function() {
    var templateData = [
      {axis:"Email",value:0.59},
      {axis:"Social Networks",value:0.56},
      {axis:"Internet Banking",value:0.42},
      {axis:"News Sportsites",value:0.34},
      {axis:"Search Engine",value:0.48},
      {axis:"View Shopping sites",value:0.14},
      {axis:"Paying Online",value:0.11},
      {axis:"Buy Online",value:0.05},
      {axis:"Stream Music",value:0.07},
      {axis:"Online Gaming",value:0.12},
      {axis:"Navigation",value:0.27},
      {axis:"App connected to TV program",value:0.03},
      {axis:"Offline Gaming",value:0.12},
      {axis:"Photo Video",value:0.4},
      {axis:"Reading",value:0.03},
      {axis:"Listen Music",value:0.22},
      {axis:"Watch TV",value:0.03},
      {axis:"TV Movies Streaming",value:0.03},
      {axis:"Listen Radio",value:0.07},
      {axis:"Sending Money",value:0.18},
      {axis:"Other",value:0.07},
      {axis:"Use less Once week",value:0.08}
    ];

    function generateData(templateData, groupCount) {
      var data = [];
      for (var i = 0; i < groupCount; i++) {
        data.push(templateData.map(function(item) {
          return {
            axis: item.axis,
            value: Math.random()
          };
        }));
      }

      return data;
    };

    return {
      restrict: 'EA',
      link: function(scope, element, attrs) {
        var rayChart = d3.rayChart();
        var cfg = {w: 400, h: 400, TranslateX: 80, TranslateY: 30}; //TODO: remove
        var g = d3.select(element[0])
          .append("svg")
          .attr("width", cfg.w + 300)
          .attr("height", cfg.h + 100)
          .append("g")
          .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");

        g.data([generateData(templateData, 3)]).call(rayChart);
      }
    };
  }]);
