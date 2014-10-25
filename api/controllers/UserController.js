/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  // index: function (req, res) {
  //   res.json(JSON.parse('{ "index": "test"}'));
  // },

  get: function (req, res) {
    res.json('get');
  },

  get_friends: function (req, res) {
    res.json('get_firneds');
  },

  get_challanges: function (req, res) {
    res.json('get_challanges');
  },

  get_tasks: function (req, res) {
    res.json('get_tasks');
  }
};

