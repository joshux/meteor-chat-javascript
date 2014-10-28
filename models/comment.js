this.Comments = new Mongo.Collection('comments');

this.Comments.allow({
  insert: function(userId, comment){
    return false; // why?
  },
  update: function(userId, comment, fields, modifier){
    userId === comment.owner && ! _.difference(fields, ['content', 'updated_at']).length;
  },
  remove: function(userId, comment){
    return userId === comment.owner;
  }
});

function NonEmptyString(x){
  check(x,String);
  return x.length !== 0;
}

Meteor.methods({
  createComment: function(content, ownerId){
    check(content,NonEmptyString);
    var commentId = Random.id();
    var now = Date.now();
    Comments.insert({
      _id: commentId,
      owner: ownerId,
      created_at: now,
      updated_at: now
    });
    return commentId;
  }
});
