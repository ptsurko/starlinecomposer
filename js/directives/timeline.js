angular.module('StarLineComposer')
  .directive('timeline', ['$compile', '$templateCache', '$http', function($compile, $templateCache, $http) {
    $http.get('/views/eventdetails.html', { cache: true })
      .success(function (html) { $templateCache.put('/views/eventdetails.html', html); return html; });
    return {
      restrict: 'EA',
      scope: {
        events: '=events'
      },
      template: '<svg></svg><div></div>',
      link: function(scope, element, attrs) {
        var scale = d3.time.scale().range([0, 800])
          .domain([new Date (2014, 7, 0), new Date(2014, 8, 0)]);
        var cfg = {
          w: 800,
          h: 80
        };

        var eventDetailsWrapEl = $('div', element);
        var timeline = d3.starline.eventsTimeline();
        timeline.scale(scale);

        timeline.on('selected', function(e) {
          scope.$apply(function() {
            var templateContent = $templateCache.get('/views/eventdetails.html');
            var eventDetailsScope = scope.$new();
            eventDetailsScope.event = e.data;

            var eventDetailsEl = $compile(templateContent)(eventDetailsScope);
            eventDetailsWrapEl.html(eventDetailsEl);
          });
        });

        var g = d3.selectAll($('svg', element))
          .attr('width', cfg.w)
          .attr('height', cfg.h)
          .data([scope.events])
          .call(timeline);

        var zoom = d3.behavior.zoom()
          .x(timeline.scale())
          .on("zoom", function() {
            g.call(timeline);
          });

        g.call(zoom)
          .on("dblclick.zoom", null);

        scope.$watch('events', function(newData, oldData) {
          g.data([scope.events])
            .call(timeline);
        }, true);
      }
    };
  }]);
;
