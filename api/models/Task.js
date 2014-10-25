/**
* Task.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    src_user: {
      model: 'user',
      required: true
    },

    dst_user: {
      model: 'user',
      required: true
    },

    challenge: {
      model: 'challenge',
      required: true
    },

    state: {
      type: 'string',
      enum: ['open', 'closed', 'in progress'],
      required: true,
      defaultsTo: 'open'
    }


  }
};

