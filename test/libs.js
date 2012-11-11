/**
 * test/libs.js
 * Library test
 */

var libs = require("../crossing_gallery/libs"),
    should = require("should");

describe("Libraries", function () {
  describe("request", function () {
    var request = new libs.request("");
    
    describe(".get", function () {
      it("get method の存在", function () {
        request.should.have.property("get");
      });
    });
  });
  
  describe("xml_parse", function () {
    var data = [];
    
    before(function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?><items><item><title>テストデータ</title></item></items>',
          selector = 'items > item';
      data = libs.xml_parse(xml, selector);
    });
    
    it("パース結果は正しいオブジェクト", function () {
      data.should.not.be.empty;
      data.forEach(function (item) {
        item.should.have.property("title");
      });
    });
  });
});