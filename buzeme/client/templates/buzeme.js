Session.set('is_current_party', false);

if (Meteor.isClient) {

  Template.buzeme.helpers({
    // show_page: function() {
    //   var current = Router.current();
    //   console.log("name: " + current.name);
    //   if (current.name === 'buzeme' || !current.name) {
    //     Router.go('signin');
    //   } else {
    //     Router.go('test');
    //   }
    // }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

