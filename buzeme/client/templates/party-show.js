Template.partyShow.helpers({
    is_current_party: function () {
        return Session.get('is_current_party');
    },
    party_name: function () {
        if (Session.get('is_current_party')) {
            return Session.get('current_party').name;
        } else {
            return false;
        }
    }
});