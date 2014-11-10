Meteor.startup(function(){
  Session.set('content','');
  Session.set('tempId',Random.id());
});

Template.commentInput.events({
  'keyup textarea': function(event,template){
    Session.set('content',template.$('textarea').val());
  },
  'click button': function(event, template){
    var userId = Meteor.userId();
    var ownerId = userId || Session.get('tempId');
    var lastComment = Comments.findOne({owner:ownerId}, {sort: {created_at: -1}});
    if(lastComment && (Date.now() - lastComment.created_at) < 3000 ){
      alert('Created too fast!');
    } else{
      Meteor.call('createComment',Session.get('content'),ownerId);
      $('.comments').scrollTop(0);
    }
    template.$('textarea').val('');
    Session.set('content','');
  }
});

Template.commentInput.currentUserName = function() {
  var currentUser;
  currentUser = Meteor.user();
  return !!currentUser ? ', '+displayName(currentUser) : '';
};

Template.chatRoom.comments = function(){
  return Comments.find({},{sorted:{ created_at: -1 }});
};

Template.commentBox.mine = function(){
  var userId = Meteor.userId();
  return !!userId && userId === this.owner;
};

Template.commentBox.creatorName = function(id){
  var creator = Meteor.users.findOne(id);
  if(creator)
    return displayName(creator);
  else
    return 'anonymous' + id;
};

Template.commentBox.showTime = function(time){
  new Date(time).toLocaleString();
};

Template.commentBox.events({
  'click .remove': function(){
    Comments.remove(this._id);
    return false;
  }
});
