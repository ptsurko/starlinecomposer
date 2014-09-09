angular.module('StarLineComposer')
  .directive('eventsTimeline', ['$compile', function($compile) {
    return {
      restrict: 'EA',
      scope: {
        events: '='
      },
      transclude: true,
      template: '<svg></svg>' +
                '<div class="events-timeline-detail hide">' +
                  '<div class="arrow"></div>' +
                  '<div class="events-timeline-detail-content"></div>' +
                '</div>',
      compile: function(element, attrs, transclude) {
        return function(scope, element, attrs) {
          var date = new Date();
          var year = date.getYear() + 1900;
          var month = date.getMonth();
          var day = date.getDate();
          var scale = d3.time.scale().range([0, 800])
            .domain([new Date(year, month, day), new Date(year, month, day + 1)]);
          var cfg = {
            w: 800,
            h: 80
          };

          var eventDetailsPanelEl = $('.events-timeline-detail', element);
          var eventDetailsArrowEl = $('.arrow', eventDetailsPanelEl);
          var timeline = d3.starline.eventsTimeline();
          timeline.scale(scale);

          timeline.on('selected', function(e) {
            eventDetailsPanelEl.removeClass('hide');
            scope.$apply(function() {
              var eventDetailsScope = scope.$new();
              eventDetailsScope.event = e.data;

              updateArrowPositioning(e.element);

              transclude(eventDetailsScope, function(clone, innerScope) {
                eventDetailsPanelEl.find('.events-timeline-detail-content').html($compile(clone)(innerScope));
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

              updateArrowPositioning(timeline.getSelectedEventElement());
            });

          g.call(zoom)
            .on("dblclick.zoom", null);

          scope.$watch('events', function(newData, oldData) {
            g.data([scope.events])
              .call(timeline);
          }, true);


          function updateArrowPositioning(selectedEventEl) {
            var timelineElementOffsetLeft = $(selectedEventEl).offset().left;
            var detailPanelOffsetLeft = eventDetailsPanelEl.offset().left;
            var detailPanelBorderLeft = parseInt(eventDetailsPanelEl.css("border-left-width"), 10);
            var detailPanelPaddingLeft = parseInt(eventDetailsPanelEl.css("padding-left"), 10);
            var timelineElementExtentWidth = $(selectedEventEl)[0].getBBox().width / 2;

            var left = timelineElementOffsetLeft - detailPanelOffsetLeft - detailPanelBorderLeft - detailPanelPaddingLeft + timelineElementExtentWidth;
            if (left > 0) {
              eventDetailsArrowEl.css({'left': left});
            } else {
              eventDetailsArrowEl.css({'left': -100});
            }
          }
        }
      }
    };
  }]);
;
