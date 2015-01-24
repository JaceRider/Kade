describe('RoleController', function(){
  var RoleController = require('../../../api/controllers/RoleController');

  it('should be an object', function(done){
    RoleController.should.be.type('object');
    done();
  });

  it('should have a list property', function(done){
    RoleController.should.have.property('list');
    done();
  });

});
