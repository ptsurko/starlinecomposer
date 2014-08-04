angular.module('StarLineComposer')
  .controller('EventsController', ['$scope', function($scope) {
    $scope.events = new vis.DataSet([
      {id: 0, content: 'event 0', start: '2014-07-10'},
      {id: 1, content: 'event 1', start: '2014-07-20'},
      {id: 2, content: 'event 2', start: '2014-07-14'},
      {id: 3, content: 'event 3', start: '2014-07-18'},
      {id: 4, content: 'event 4', start: '2014-07-16'},
      {id: 5, content: 'event 5', start: '2014-07-25'},
      {id: 6, content: 'event 6', start: '2014-07-27'}
    ]);
  }]);
