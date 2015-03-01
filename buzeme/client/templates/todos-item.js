var EDITING_KEY = 'EDITING_TODO_ID';
var IS_DOWN = false;

Template.todosItem.helpers({
  checkedClass: function() {
    return this.drinking && 'drinking';
  },
  editingClass: function() {
    return Session.equals(EDITING_KEY, this._id) && 'editing';
  },
  isUser: function() {
    var userId = Todos.findOne({_id: this._id}).userId;
    return userId === Meteor.userId();
  },
  isDown: function() {
    if (IS_DOWN) {
      return "down";
    } else {
      return "";
    }
  },
  isDrinking: function() {
    if (this.drinking) {
      return 1;
    } else {
      return 0;
    }
  }
});

Template.todosItem.events({
  
  'focus input[type=text]': function(event) {
    Session.set(EDITING_KEY, this._id);
  },
  
  'blur input[type=text]': function(event) {
    if (Session.equals(EDITING_KEY, this._id))
      Session.set(EDITING_KEY, null);
  },
  
  'keydown input[type=text]': function(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },
  
  // update the text of the item on keypress but throttle the event to ensure
  // we don't flood the server with updates (handles the event at most once 
  // every 300ms)
  'keyup input[type=text]': _.throttle(function(event) {
    Todos.update(this._id, {$set: {text: event.target.value}});
  }, 300),
  
  // handle mousedown otherwise the blur handler above will swallow the click
  // on iOS, we still require the click event so handle both
  'mousedown .js-delete-item, click .js-delete-item': function() {
    Todos.remove(this._id);
  },

  // handle mousedown otherwise the blur handler above will swallow the click
  // on iOS, we still require the click event so handle both
  'click .js-booze-me': function() {
    this.drinking = ! this.drinking;
    if (! this.drinking) {
      IS_DOWN = false;
      Todos.update(this._id, {
        $set: {drinking: this.drinking, endDrinking: new Date()}
      });
    } else {
      IS_DOWN = true;
      Todos.update(this._id, {
        $set: {drinking: this.drinking, startDrinking: new Date()}
      });
    }
  }

});