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
          autoclose: true,
          initialDate: new Date()
        }).on('changeDate', function(e) {
          scope.$apply(function() {
            // We need this conversion as datepicker supposes that it works in UTC
            var date = new Date(e.date.getUTCFullYear(), e.date.getUTCMonth(), e.date.getUTCDate(), e.date.getUTCHours(), e.date.getUTCMinutes(), e.date.getUTCSeconds(), 0)

            $('input', element).val('');
            var onSelectDate = scope.onSelectDate();
            onSelectDate(date);
          });
        });
      }
    };
  }]);
