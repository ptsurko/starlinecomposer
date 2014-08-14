angular.module('StarLineComposer')
  .directive('eventsTimeline', ['$compile', function($compile) {
    return {
      restrict: 'EA',
      scope: {
        events: '='
      },
      transclude: true,
      template: '<svg></svg>' +
                '<div class="panel panel-default timeline-events-detail-panel hide">' +
                  '<div class="panel-body"></div>' +
                '</div>',
      compile: function(element, attrs, transclude) {
        return function(scope, element, attrs) {
          var scale = d3.time.scale().range([0, 800])
            .domain([new Date (2014, 7, 0), new Date(2014, 8, 0)]);
          var cfg = {
            w: 800,
            h: 80
          };

          var eventDetailsPanelEl = $('.timeline-events-detail-panel', element);
          var timeline = d3.starline.eventsTimeline();
          timeline.scale(scale);

          timeline.on('selected', function(e) {
            eventDetailsPanelEl.removeClass('hide');
            scope.$apply(function() {
              var eventDetailsScope = scope.$new();
              eventDetailsScope.event = e.data;

              transclude(eventDetailsScope, function(clone, innerScope) {
                eventDetailsPanelEl.find('.panel-body').html($compile(clone)(innerScope));
              });
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
      }
    };
  }]);
;
