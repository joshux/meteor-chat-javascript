Meteor.publish('users', function(){
  Meteor.users.find({}, { fields: { emails: 1 , profile: 1} } );
});
Meteor.publish('comments',function(){
  Comments.find({}, { sort: { created_at: -1 } , limit:20 });
});
Meteor.publish('allComments',function(){
  Comments.find();
});
