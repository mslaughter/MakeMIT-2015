var ERRORS_KEY = 'signinErrors';

Template.findparty.created = function() {
  Session.set(ERRORS_KEY, {});
};

Template.findparty.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.findparty.events({
  'submit': function(event, template) {
    event.preventDefault();
    
    var code = template.$('[name=partycode]').val();
    
    var errors = {};

    if (! code) {
      errors.partycode = 'Party code is required';
    }
    
    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    var party = Lists.findOne({"partycode": code});
    console.log(party);
    if (! party) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
    }

    Router.go('listsShow', party);
  }
});