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
  }
})
