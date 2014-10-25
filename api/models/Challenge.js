/**
* Challenge.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  types: {
    isUntilValid: function(until) {
      var d = new Date();
      return until > d;
    }
  },

  attributes: {
    Name: {
      type: 'string',
      required: true
    },

    Amount: {
      type: 'integer',
      defaultsTo: 0
    },

    Until: {
      type: 'datetime',
      isUntilValid: true
    },

    Fund: {
      model: 'Fund'
    },

    skip_avail: {
      type: 'boolean',
      defaultsTo: false
    }

  }
};

