angular.module('StarLineComposer')
  .directive('timeline', ['$compile', '$templateCache', '$http', function($compile, $templateCache, $http) {
    $http.get('/views/eventdetails.html', { cache: true })
      .success(function (html) { $templateCache.put('/views/eventdetails.html', html); return html; });
    return {
      restrict: 'EA',
      scope: {
        events: '=events'
      },
      template: '<svg class="timeline"></svg><div></div>',
      link: function(scope, element, attrs) {
        var eventDetailsWrapEl = $('div', element);
        var timeline = d3.starline.eventsTimeline();
        var cfg = {
          w: 800,
          h: 50
        };
        timeline.on('selected', function(e) {
          scope.$apply(function() {
            var templateContent = $templateCache.get('/views/eventdetails.html');
            var eventDetailsScope = scope.$new();
            eventDetailsScope.event = e.data;

            var eventDetailsEl = $compile(templateContent)(eventDetailsScope);
            eventDetailsWrapEl.html(eventDetailsEl);
          });
        });

        var g = d3.select($('svg', element)[0])
          //.attr('class', 'timeline')
          .attr('width', cfg.w)
          .attr('height', cfg.h)
          .call(timeline);

        //element.append(eventDetailsWrapEl);

        scope.$watch('events', function(newData, oldData) {
          timeline.setEvents(scope.events);
        }, true);
      }
    };
  }]);
;
