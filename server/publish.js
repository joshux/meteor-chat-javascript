Meteor.publish('users', function(){
  return Meteor.users.find({}, { fields: { emails: 1 , profile: 1} } );
});
Meteor.publish('comments',function(){
  return Comments.find({}, { sort: { created_at: -1 } , limit:20 });
});
Meteor.publish('allComments',function(){
  return Comments.find();
});
