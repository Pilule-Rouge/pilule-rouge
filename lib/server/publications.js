Meteor.publish('about', function() {
  if(isAdminById(this.userId)){
    return About.find({ }, { limit: 1 });
  }
  return [];
});
