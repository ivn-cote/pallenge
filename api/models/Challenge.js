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
    name: {
      type: 'string',
      required: true
    },

    descript: {
      type: 'string',
      required: true
    },

    amount: {
      type: 'integer',
      defaultsTo: 0
    },

    until: {
      type: 'datetime',
      isUntilValid: true
    },

    fund: {
      model: 'Fund'
    },

    skip_avail: {
      type: 'boolean',
      defaultsTo: false
    },

    owner: {
      model: 'user',
      required: true
    }

  }
};

