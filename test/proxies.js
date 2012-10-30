/**
 * test/proxies.js
 * proxies test
 */

var CrossingGallery = require("../lib/crossing_gallery"),
    should = require("should");

var cg = new CrossingGallery();

describe("Proxies", function () {
  var proxies = cg.proxies;
  
  Object.keys(proxies).forEach(function (proxy) {
    describe("." + proxy, function () {
      describe(".search", function () {
        var photos = [];
        
        before(function (done) {
          proxies[proxy].search({
            limit: 1,
            keyword: "ねこ"
          }, function (data) {
            photos = data;
            
            done();
          });
        });
        
        it("検索結果は要素が1つ以上の配列", function () {
          photos.should.be.a("object");
          photos.should.be.an.instanceOf(Array);
          photos.should.not.be.empty;
        });
        
        it("検索結果は正しいオブジェクト", function () {
          photos.forEach(function (photo) {
            photo.should.have.property("title");
            photo.should.have.property("url");
            photo.should.have.property("original");
            photo.should.have.property("site");
          });
        });
      });
    });
  });
});