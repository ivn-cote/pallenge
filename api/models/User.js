/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },

    social_id: {
      type: 'integer',
      required: true
    },

    social_provider: {
      type: 'string',
      enum: ['facebook','vkontakte', 'twitter'],
      required: true
    },

    rating: {
      type: 'integer',
      defaultsTo: 0
    }

  }
};

