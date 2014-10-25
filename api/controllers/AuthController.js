/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  auth: function(req, res) {
    res.json('AuthController auth');

  },

  auth_callback: function(req, res) {
    res.json('AuthController sauth_callback');
  }
	
};

