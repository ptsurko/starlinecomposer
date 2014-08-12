angular.module('StarLineComposer')
  .directive('datetimepicker', [function() {
    return {
      restrict: 'EA',
      scope: {
        onSelectDate: '&onSelectDate'
      },
      link: function(scope, element, attrs) {
        $(element).datetimepicker({
          format: "dd MM yyyy - HH:ii P",
          autoclose: true
        }).on('changeDate', function(e) {
          scope.$apply(function() {
            $('input', element).val('');
            var onSelectDate = scope.onSelectDate();
            onSelectDate(e.date);
          });
        });
      }
    };
  }]);
