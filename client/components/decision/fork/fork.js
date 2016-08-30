Template.fork.helpers({
  length: function () {
    if (this.label.length > 51) {
      return 'option-link option-long option-longest';
    } else if (this.label.length > 37) {
      return 'option-link option-long';
    } else {
      return '';
    }
  },
  dragMode: function () {
    if (Session.get('contract').stage == 'DRAFT') {
      return '';
    } else {
      return 'vote-nondrag';
    }
  },
  tickStyle: function () {
    if (this.mode == 'REJECT') {
      return 'unauthorized';
    }
  },
  checkbox: function (mode) {
    switch (mode) {
      case 'AUTHORIZE':
        return 'vote-authorize nondraggable';
      case 'REJECT':
        return 'vote-authorize unauthorized nondraggable';
      case 'FORK':
        return 'vote vote-alternative';
    }
  },
  action: function () {
      if (this.authorized == false) {
        return 'undefined';
      }
  },
  option: function (mode) {
    if (Session.get('stage') == 'draft') {
      return 'disabled';
    } else {
      switch (mode) {
        case 'AUTHORIZE':
          return '';
        case 'REJECT':
          return 'option-link ';
        default:
          return '';
      }
    }
  },
  decision: function (mode) {
    switch (mode) {
      case 'REJECT':
        return 'option-link unauthorized';
      default:
        return '';
    }
  },
  caption: function (mode) {
    if (mode != 'FORK') {
      return TAPi18n.__(mode);
    } else {
      return this.label;
    }
  },
  tick: function () {
    if (Session.get('stage') == 'draft') {
      return 'disabled'
    }
  },
  tickStatus: function () {
    if (Session.get('potentialVote')) {
      if (Modules.client.getVoteBallot(Session.get('contract')._id, this._id)) {
        return 'tick-active';
      } else {
        return '';
      }
    }
  }
});


Template.fork.events({
  "click #ballotCheckbox": function (event) {
    switch (Session.get('stage')) {
      case 'draft':
        Session.set('disabledCheckboxes', true);
        break;

      default:
        var ticked = event.target.getAttribute('tick');
        var ballotOption = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute('value');
        Modules.client.setVoteBallot(Session.get('contract')._id, ballotOption, !ticked);

    }
  },

  "click #remove-fork": function () {
    Meteor.call("removeFork", Session.get('contract')._id, this._id);
  }
});