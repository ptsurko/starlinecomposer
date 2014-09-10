//TODO: try use AMD
var _axisIndex = 0;
var _defaultAxis = {
  scale: '10',
  scaleEnabled: false,
  expectedValue: 5
};

function Visualisation(id, name) {
  this.id = id;
  this.name = name;
  this.axises = [];
};

Visualisation.prototype.addAxis = function(newAxis) {
  var axis = angular.extend(newAxis || {}, _defaultAxis);
  axis.id = _axisIndex++;
  axis = angular.extend(axis, {name: 'Lorem Ipsum' + axis.id});

  this.axises.push(axis);
};

Visualisation.prototype.removeAxis = function(axisToRemove) {
  var index = this.axises.indexOf(axisToRemove);
  this.axises.splice(index, 1);
};
