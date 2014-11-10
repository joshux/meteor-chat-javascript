/*Router.configure({
  layoutTemplate: 'layout'
});*/

Router.route('/', {
  layoutTemplate:'layout',
  template:'chatRoom',
  yieldRegions: {
  'chatRoomHeader': { to: 'header' }
  },
  waitOn: function(){ 
    Meteor.subscribe('comments');
  }
});

Router.route('/logs', {
  name: 'logsRoute',
  layoutTemplate: 'layout',
  template: 'logs',
  yieldRegions:{
    'logsHeader': { to: 'header' }
  },
  waitOn: function(){
    Meteor.subscribe('allComments');
  }
});
