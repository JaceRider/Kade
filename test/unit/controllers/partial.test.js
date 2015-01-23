'use strict';

var should = require('should');
var mocha = require('mocha');

describe('controllers', function(){

  describe('PartialController', function(){
    var PartialController = require('../../../api/controllers/PartialController');

    it('should be an object', function(done){
      PartialController.should.be.type('object');
      done();
    });

    it('should have a index property', function(done){
      PartialController.should.have.property('index');
      done();
    });

  });

});
