AutoForm.hooks({
  updateAboutForm: {
    before: {
      update: function(docId, modifier, template) {
        template.$('button[type=submit]').addClass('loading');
        return modifier;
      }
    },

    onSuccess: function(operation, result, template) {
      template.$('button[type=submit]').removeClass('loading');
    },

    onError: function(operation, result, template) {
      template.$('button[type=submit]').removeClass('loading');
    }

  },
});

Template.aboutEditor.helpers({
  'about': function() {
    return About.findOne();
  }
});
