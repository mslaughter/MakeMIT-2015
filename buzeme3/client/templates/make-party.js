var ERRORS_KEY = 'joinErrors';

Template.makeparty.created = function() {
  Session.set(ERRORS_KEY, {});
};

Template.makeparty.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.makeparty.events({
  'submit': function(event, template) {
    event.preventDefault();
    var partyname = template.$('[name=partyname]').val();

    var errors = {};

    if (! partyname) {
      errors.partyname = 'Party name required';
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    var partycode = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        partycode += possible.charAt(Math.floor(Math.random() * possible.length));

    var list = {partyname: partyname, partycode: partycode};
    list._id = Lists.insert(list);

    Router.go('listsShow', list);
  }
});