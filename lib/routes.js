adminMenu.push({
  route: 'aboutEditor',
  label: 'About',
  description: 'editor_about_description'
});

Meteor.startup(function () {

  Router.onBeforeAction(Router._filters.isAdmin, {only: ['aboutEditor']});

  Router.route('about', {
    path: '/about',
    template: getTemplate('aboutPage'),
    waitOn: function() {
      return [
      Meteor.subscribe('about')
      ];
    }
  });

  Router.route('/editor/about', {
    name: 'aboutEditor',
    waitOn: function() {
      return [
      Meteor.subscribe('about')
      ];
    },
    template: getTemplate('aboutEditor')
  });

});
