Template.partyPage.helpers({
  thisArray: function() {
    return [this];
  },
  parties: function() {
    return Parties.find();
  },
  activeListClass: function() {
    var current = Router.current();
    if (current.route.name === 'partyShow' && current.params._id === this._id) {
      return 'active';
    }
  },
});