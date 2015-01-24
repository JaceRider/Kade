/**
 * UserController
 *
 * @description :: Server-side logic for managing users and auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * Return information about currently logged in user.
   */
  self: function(req, res) {
    sails.services.auth.getSelf(req, function(err, user){
      if(err){
        return res.forbidden({err: err});
      }

      // valid request
      res.json(user);
    });
  }

};
