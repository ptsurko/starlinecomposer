function Event(date, visualisation) {
  this.values = [];
  this.date = date;
  this.visualisation = visualisation;
};


Event.prototype.setValue = function(axisId, value) {
  if (this.values.axisId) {
    this.values.axisId.value = value;
  } else {
    this.values.axisId = {value: value};
  }
};


Event.prototype.getValue = function(axisId) {
  for(var i = 0; i < this.values.length; i++) {
    if (this.values[i].axisId == axisId) {
      return this.values[i].value;
    }
  }
};


Event.prototype.getValues = function() {

};
