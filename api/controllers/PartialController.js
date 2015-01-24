/**
 * PartialController
 *
 * @description :: Server-side logic for managing partials
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res, next) {
    return res.view('../app' + req.url.replace('/partials',''));
  }
};

