Router.map(function(){
  this.route('home',{
    path: '/',
    layoutTemplate: 'layout' ,
    template: 'chatRoom',
    yieldTemplates: {
      'chatRoomHeader': { to: 'header' }
    },
    waitOn: function(){
      Meteor.subscribe('comments');
    }
  });

  this.route('logs', {
    path: '/logs',
    layoutTemplate: 'layout',
    template: 'logs',
    yieldTemplates:{
      'logsHeader': { to: 'header' }
    },
    waitOn: function(){
      Meteor.subscribe('allComments');
    }
  });
});
