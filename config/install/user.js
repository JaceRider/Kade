'use strict';

module.exports = function () {

  /**
   * Create admin user.
   */
  Auth.find().exec(function(err, users) {
    if(users.length === 0){
      var attr = {
        email: 'email@site.com',
        password: '2600',
        roles: [1]
      };
      sails.services['auth'].getUserAuthObject(attr, true, function(err, user){
        if (err) {
          sails.log.verbose(__filename + ':' + __line + ' ' + err);
        }
        if (user) {
          user.addRole(1, function(err, role){
            if(role){
              sails.log.info(__filename + ':' + __line + ' Admin user was created. Email: ' + attr.email + ' | Password: ' + attr.password);
              user.addRole(2, function(err, role){
                if(role){
                  sails.log.info(__filename + ':' + __line + ' Admin user was created. Email: ' + attr.email + ' | Password: ' + attr.password);
                }
              });
            }
          });
        }
        else {
          sails.log.info(__filename + ':' + __line + ' Admin user could not be created');
        }
      });
    }
  });

}
