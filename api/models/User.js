/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    Name: {
      type: 'string',
      required: true
    },

    Social_id: {
      type: 'integer',
      required: true
    },

    Social_provider: {
      type: 'string',
      enum: ['facebook','vkontakte', 'twitter'],
      required: true
    },

    Rating: {
      type: 'integer',
      defaultsTo: 0
    }

  }
};

