function Event(date) {
  this.values = [];
  this.date = date;
};

Event.prototype.setValue = function(axisId, value) {
  for(var i = 0; i < this.values.length; i++) {
    if (this.values[i].axisId == axisId) {
      this.values[i].value = value;
      return;
    }
  }
  this.values.push({axisId: axisId, value: value});
};


Event.prototype.getValue = function(axisId) {
  for(var i = 0; i < this.values.length; i++) {
    if (this.values[i].axisId == axisId) {
      return this.values[i].value;
    }
  }
  return null;
}
