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
    // var id = req.param('id');
    // console.log('user_id: ' + id);

    // User.find({id: id }).then(function(user) {
    //   res.json(user);
    // })

    res.json({get_friends:  1})
  },

  get_challanges: function (req, res) {
    res.json('get_challanges');
  },

  get_tasks: function (req, res) {

    var id = req.param('id');

    User.findOne({id: id}, function (err, user) {
      Task.find({dst_user: id, state: 'open'})
        .populate('src_user')
        .populate('challenge')
        .then(function (task) {
          res.json(task);
      })
    })

  }
};

