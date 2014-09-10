angular.module('StarLineComposer')
  .service('VisualisationService', function() {
    var visualisation = null;
    this.getVisualisation = function() {
      return visualisation || this.getDefaultVisualisation();
    };

    this.saveVisualisation = function(newVisualisation) {
      visualisation = newVisualisation;
    };

    this.getDefaultVisualisation = function() {
      var visualisation = new Visualisation(0, 'default');

      for(var i = 0; i < 5; i++) {
        visualisation.addAxis();
      }

      return visualisation;
    }
  });
