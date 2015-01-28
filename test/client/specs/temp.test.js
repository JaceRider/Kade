/* jshint -W117, -W030 */
describe('app.home module', function(){

  beforeEach(module('app'));
  beforeEach(module('app.home'));

  var controller;

  beforeEach(function() {
    module('app', specHelper.fakeLogger);
    specHelper.injector(function($controller, $q, $rootScope) {});
  });

  beforeEach(function () {
    controller = $controller('Home');
  });

  describe('Home controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have logout function', function() {
        expect(controller.logout).to.be.function;
      });
    });
  });
});
