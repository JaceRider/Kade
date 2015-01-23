'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');

describe('controllers', function(){
  it('should be an object of awesomeness', function(done){
    var AuthController = require('../../../api/controllers/AuthController');
    AuthController.should.be.type('object');
    done();
  });

  // describe('#waterlock()', function(){
  //   var Controllers = proxyquire.noCallThru().load('../../../lib/controllers',{
  //     './actions/login': {foo: 'bar'},
  //     './actions/logout': {faz: 'baz'}
  //   });
  //   var waterlock = {
  //     loggger: {verbose: function(){}},
  //     methods: {}
  //   };
  //   var controllers = Controllers.apply(waterlock);

  //   it('should have a login property', function(done){
  //     var results = controllers.waterlocked({});
  //     results.should.have.property('login');
  //     done();
  //   });
  //   it('should have a logout property', function(done){
  //     var results = controllers.waterlocked({});
  //     results.should.have.property('logout');
  //     done();
  //   });

  //   it('should merge given actions', function(done){
  //     var results = controllers.waterlocked({foo:'bar'});
  //     results.should.have.property('foo');
  //     done();
  //   });

  //   it('should merge any extras from waterlock.*.methods', function(done){
  //     var waterlock = {
  //       logger: {verbose: function(){}},
  //       methods: {
  //         shake: {
  //           actions:{
  //             extras: {
  //               shake: 'bake'
  //             }
  //           }
  //         }
  //       }
  //     };
  //     var controllers = Controllers.apply(waterlock);
  //     var results = controllers.waterlocked({});
  //     results.should.have.property('shake');
  //     done();
  //   });
  // });
  // describe('#user()', function(){
  //    var Controllers = proxyquire.noCallThru().load('../../../lib/controllers',{
  //     './actions/jwt': function(){}
  //   });
  //   var waterlock = {
  //     logger: {verbose: function(){}}
  //   };
  //   var controllers = Controllers.apply(waterlock);

  //   it('should have a jwt property', function(done){
  //     var results = controllers.user({});
  //     results.should.have.property('jwt');
  //     done();
  //   });

  //   it('should merge given actions', function(done){
  //     var results = controllers.user({faz:'baz'});
  //     results.should.have.property('faz');
  //     done();
  //   });
  // });
});
