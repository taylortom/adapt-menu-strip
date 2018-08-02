define([
    'core/js/views/menuView',
    './stripMenuItemView'
], function(MenuView, StripMenuItemView) {
  var StripMenuView = MenuView.extend({
    className: function() {
      return MenuView.prototype.className.apply(this) + " stripmenu-menu";
    },

    postRender: function() {
      var nthChild = 0;
      this.model.getChildren().each(function(item) {
        if (item.get('_isAvailable') && !item.get('_isHidden')) {
          item.set('_nthChild', ++nthChild);
          this.$('.menu-container-inner').append(new StripMenuItemView({ model: item }).$el);
        }
        if(item.get('_isHidden')) item.set('_isReady', true);
      });
    }
  }, {
    template: 'stripmenu'
  });

  return StripMenuView;
});
