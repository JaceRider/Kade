'use strict';

var should = require('should');

/* jshint -W117, -W030 */
describe('temporary', function(){

  describe('index', function() {
    it('should contain a heading', function (done) {
      browser.get('/');
      element(by.xpath('//h1')).getText().then(function(text) {
        text.should.eql('Public Page');
        done();
      });
    });
  });


  describe('Authentication capabilities', function(){
    var email = element(by.id('user-login-email'));
    var password = element(by.id('user-login-password'));
    var loginButton = element(by.id('user-login-submit'));

    it('should accept a valid email address and password', function () {
      // console.log(email.getOuterHtml());
      this.timeout(50000);
      email.clear();
      password.clear();
      email.sendKeys('email@site.com');
      password.sendKeys('2600');
      loginButton.click().then(function(){
        return browser.driver.isElementPresent(by.css('user-logout'));
      });
    });
  });
});
