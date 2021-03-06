Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [
      Meteor.subscribe('publicLists'),
      Meteor.subscribe('privateLists')
    ];
  }
});

dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

Router.map(function() {
  this.route('join');
  this.route('signin');
  this.route('findparty');
  this.route('makeparty');

  // this.route('result', {
  //   data: function () {
  //     return Todos.findOne(this.params._id).drinking;
  //   },
  // });

  this.route('listsShow', {
    path: '/party/:_id',
    // subscribe to todos before the page is rendered but don't wait on the
    // subscription, we'll just render the items as they arrive
    onBeforeAction: function () {
      this.todosHandle = Meteor.subscribe('todos', this.params._id);

      if (this.ready()) {
        // Handle for launch screen defined in app-body.js
        dataReadyHold.release();
      }
    },
    data: function () {
      return Lists.findOne(this.params._id);
    },
    action: function () {
      this.render();
    }
  });

  this.route('home', {
    path: '/',
    action: function() {
      Router.go('listsShow', Lists.findOne());
    }
  });

  this.route('results', {
    path: '/results',
    where: 'server',
    action: function() {
      // GET, POST, PUT, DELETE
      var requestMethod = this.request.method;
      // Data from a POST request
      var requestData = this.request.body;
      // Could be, e.g. application/xml, etc.
      this.response.writeHead(200, {'Content-Type': 'text/html'});

      var responseData = "on";
      if (requestMethod === "GET") {
        var todos = Todos.findOne({drinking: true});
        if (! todos) {
          responseData = "off";
        }
      }
      this.response.end(responseData);
    }
  });
});

// Router.route('/results', { where: 'server' })
//   .get(function () {
//     return 0;
//   })
//   .post(function () {
//     // POST /webhooks/stripe
//   })
//   .put(function () {
//     // PUT /webhooks/stripe
//   });
