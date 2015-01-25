Template.aboutPage.helpers({
  aboutContent: function() {
    doc = About.findOne();
    return doc.content;
  }
})
