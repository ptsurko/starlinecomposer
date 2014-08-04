angular.module('StarLineComposer')
  .directive('starlinechart', [function() {
    return {
      restrict: 'EA',
      scope: {
        axises: '=axises'
      },
      link: function(scope, element, attrs) {
        var rayChart = d3.rayChart();
        var cfg = {w: 400, h: 400, TranslateX: 80, TranslateY: 30}; //TODO: remove
        var g = d3.select(element[0])
          .append("svg")
          .attr("width", cfg.w + 300)
          .attr("height", cfg.h + 100)
          .append("g")
          .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");

        scope.$watch('axises', function(newData, oldData) {
          g.data([[newData]]).call(rayChart);
        }, true);
      }
    };
  }]);
