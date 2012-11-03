/**
 * test/libs.js
 * Library test
 */

var libs = require("../crossing_gallery/libs"),
    should = require("should");

describe("Libraries", function () {
  describe("Request", function () {
    var request = libs.request();
    
    describe(".get", function () {
      it("get method を持っている", function () {
        request.should.have.property("get");
      });
    });
  });
  
  describe("xml_parse", function () {
    var data = [];
    
    before(function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?><items><item><title>テストデータ</title></item></items>',
          selector = 'items';
      data = libs.xml_parse(xml, selector);
    });
    
    it("パース結果は正しいオブジェクト", function () {
      data.should.not.exists;
    });
  });
});