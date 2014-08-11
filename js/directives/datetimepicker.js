angular.module('StarLineComposer')
  .directive('datetimepicketr', [function() {
    return {
      restrict: 'EA',
      link: function(scope, element, attrs) {
        $(element).datetimepicker({
          format: "dd MM yyyy - HH:ii P",
          autoclose: true
        }).on('changeDate', function(e) {
          scope.$apply(function() {
            scope.onChange(e.date);
          });
        });
      }
    };
  }]);
