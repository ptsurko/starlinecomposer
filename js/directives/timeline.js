angular.module('StarLineComposer')
  .directive('timeline', [function() {
    return {
      restrict: 'EA',
      scope: {
        events: '=events'
      },
      link: function(scope, element, attrs) {
        var options = {};
        var timeline = new vis.Timeline(element[0], scope.events, options);

        // scope.$watch('axises', function(newData, oldData) {
        //   //g.data([[newData]]).call(rayChart);
        // }, true);
      }
    };
  }]);
