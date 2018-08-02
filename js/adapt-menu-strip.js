define([
    'core/js/adapt',
    './stripMenuView'
], function(Adapt, StripMenuView) {
  Adapt.on('router:menu', function(model) {
    $('#wrapper').append(new StripMenuView({model: model}).$el);
  });
});
