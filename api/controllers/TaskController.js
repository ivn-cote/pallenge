/**
 * TaskController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  get_count_by_user: function (req, res) {
    var id = req.param('id');
    var full_to_do_count = 0;
    var topay = 0;
    var completed = 0;
    var sent = 0;

    // Full todo list

    async.parallel({
      full_to_do_count: function (cb) {
        Task.count({dst_user: id, state: 'open'}, function (err, count) {
          cb(null, count);
        });
      },
      
      topay: function (cb) {
        Task.count({src_user: id, state: 'closed'}, function (err, count) {
          cb(null, count);
        });
      },
      
      sent: function (cb) {
        Task.count({src_user: id, state: 'open'}, function (err, count) {
          cb(null, count);
        });
      },

      completed: function (cb) {
        Task.count({dst_user: id, state: 'closed'}, function (err, count) {
          cb(null, count);
        });
      }

    },
      function (err, results) {
        res.json({ result: results });  
      }

    );

  }

	
};

