Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'buzeme',

  // the appNotFound template is used for unknown routes and missing lists
  // notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  // loadingTemplate: 'appLoading',

});

dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  // Router.onBeforeAction('loading', {except: ['join', 'signin']});
  // Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

Router.map(function() {
  this.route('partyPage', {
    path: '/parties',
  });

  this.route('findParty', {
    path: '/find',
  });

  this.route('partyShow', {
    path: '/parties/:_id',
    // subscribe to todos before the page is rendered but don't wait on the
    // subscription, we'll just render the items as they arrive
    data: function () {
      return Parties.findOne(this.params._id);
    },
    action: function () {
      this.render();
    }
  });

  this.route('buzeme', {
    path: '/',
  });
});
