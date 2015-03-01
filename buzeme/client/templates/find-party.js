Template.findParty.events({
  'submit': function(event, template) {
    event.preventDefault();
    
    var partyname = template.$('[name=email]').val();
    
    var errors = {};

    if (! partyname) {
      errors.partyname = 'Party name is required';
    }
    
    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }
  }
});