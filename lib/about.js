var aboutSchema = new SimpleSchema({
  content: {
    type: String,
    optional: false,
    autoform: {
      group: 'general',
      rows: 10,
      instructions: 'The content of your about page.'
    }
  }
});

About = new Meteor.Collection("about");
About.attachSchema(aboutSchema);

Meteor.startup(function () {
  About.allow({
    insert: isAdminById,
    update: isAdminById,
    remove: isAdminById
  });
});

Meteor.startup(function() {
  if (Meteor.isServer) {
    if (About.find().count() == 0) {
      about = {
        content: "Change the content of your about page in your administration."
      }

      About.insert(about);
    }
  }
});
