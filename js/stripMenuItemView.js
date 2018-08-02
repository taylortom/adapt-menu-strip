define(['core/js/views/menuView'], function(MenuView) {
  var StripMenuItemView = MenuView.extend({
    events: {
      'click button' : 'onClickMenuItemButton'
    },

    className: function() {
      var nthChild = this.model.get('_nthChild');
      return [
        'menu-item',
        'menu-item-' + this.model.get('_id') ,
        this.model.get('_classes'),
        this.model.get('_isVisited') ? 'visited' : '',
        this.model.get('_isComplete') ? 'completed' : '',
        this.model.get('_isLocked') ? 'locked' : '',
        'nth-child-' + nthChild,
        nthChild % 2 === 0 ? 'nth-child-even' : 'nth-child-odd'
      ].join(' ');
    },

    preRender: function() {
      this.model.checkCompletionStatus();
      this.model.checkInteractionCompletionStatus();
    },

    postRender: function() {
      var graphic = this.model.get('_graphic');
      if (graphic && graphic.src) {
        this.$el.imageready(this.setReadyStatus.bind(this));
        return;
      }
      this.setReadyStatus();
    },

    onClickMenuItemButton: function(event) {
      if(event && event.preventDefault) event.preventDefault();
      if(this.model.get('_isLocked')) return;
      Backbone.history.navigate('#/id/' + this.model.get('_id'), {trigger: true});
    }
  }, {
    template: 'stripmenu-item'
  });

  return StripMenuItemView;
});
