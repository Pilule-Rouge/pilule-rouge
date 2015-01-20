// https://www.kimonolabs.com/api/2i8phbko?apikey=4udcxJD3BEQyD25sOZ9QXN0Sb6Q4OMrr&kimpath1=2015&kimpath2=01&kimpath3=09&kimpath4=pew-facebook-user-growth-slowed-as-others-gained-but-still-has-most-engaged-users

getShares = function (posts) {

  console.log('// Getting share counts for '+posts.fetch().length+' posts…')

  // define a function to do the updating and rate-limit it
  var updatePost = function (post) {

    var url = post.url;
    var fbUrl = 'http://graph.facebook.com/?id=' + url;
    var twUrl = 'http://cdn.api.twitter.com/1/urls/count.json?url=' + url;
    var lkUrl = 'http://www.linkedin.com/countserv/count/share?format=json&url=' + url;

    try {
      var timestamp = moment();

      // facebook shares
      var fbData = HTTP.get(fbUrl);
      var fbShares = fbData.data.shares;
      var fbShares = typeof fbShares !== 'undefined' ? parseInt(fbShares) : 0;

      console.log('Facebook: ' + timestamp.format('HH:mm:ss') + ' -- ' + url +  ' -- ' + fbShares);

      // twitter shares
      var twData = HTTP.get(twUrl);
      var twShares = twData.data.count;
      var twShares = typeof twShares !== 'undefined' ? parseInt(twShares) : 0;

      console.log('Twitter: ' + timestamp.format('HH:mm:ss') + ' -- ' + twShares);

      // linkedin shares
      var lkData = HTTP.get(lkUrl);
      var lkShares = lkData.data.count
      var lkShares = typeof lkShares !== 'undefined' ? parseInt(lkShares) : 0;

      console.log('Linkedin: ' + timestamp.format('HH:mm:ss') + ' -- ' + lkShares);

      var shares = fbShares + twShares + lkShares;

      Posts.update(post._id, { $set: { shares: shares } });
    } catch (error) {
      console.log(error);
    }

  }
  var updatePostLimited = rateLimit(updatePost, 4000);

  // loop over posts and update their share count
  posts.forEach(updatePostLimited);

}

getLast5PostsShares = function () {
  // get shares for last 5 posts
  console.log('// Last 5')
  var posts = Posts.find({}, {limit: 5, sort: {postedAt: -1}});
  getShares(posts);
}

getLast3DaysPostsShares = function () {
  // get shares for posts from the last 3 days
  console.log('// Last 3 days')
  var posts = Posts.find({
    postedAt: {
      $gte: moment().subtract(3, 'days').toDate()
    }
  }, {sort: {postedAt: -1}});
  getShares(posts);
}

getAllPostsShares = function () {
  // get shares for all posts
  console.log('// All posts')
  var posts = Posts.find({}, {sort: {postedAt: -1}});
  getShares(posts);
}

getMissingPostsShares = function () {
  // get shares for all posts without shares
  console.log('// Missing shares posts')
  var posts = Posts.find({shares: {$exists: false}}, {sort: {postedAt: -1}});
  getShares(posts);
}

Meteor.methods({
  getLast5PostsShares: function () {
    if (isAdmin(Meteor.user()))
      getLast5PostsShares();
  },
  getLast3DaysPostsShares: function () {
    if (isAdmin(Meteor.user()))
      getLast3DaysPostsShares();
  },
  getAllPostsShares: function () {
    if (isAdmin(Meteor.user()))
      getAllPostsShares();
  },
  getMissingPostsShares: function () {
    if (isAdmin(Meteor.user()))
      getMissingPostsShares();
  }
});
