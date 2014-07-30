angular.module('StarLineComposer')
  .directive('axisnameeditor', [function() {
    return {
      restrict: 'EA',
      scope: {
        model: '='
      },
      templateUrl: '/views/axisnameeditor.html',
      link: function(scope, element, attrs) {
        element.addClass('axisnameeditor');
        if (!scope.model) {
          element.addClass('edit');
        }

        var buttonEl = $('.axisnameeditor-button', element);
        var inputEl = $('.axisnameeditor-input', element);

        buttonEl.on('click', function() {
          element.toggleClass('edit');
          inputEl.focus();
        });
        inputEl.on('blur', function() {
          if ($.trim(scope.model)) {
            element.toggleClass('edit');
          }
        });
      }
    };
  }]);
