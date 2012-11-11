/**
 * test/proxies.js
 * proxies test
 */

var CrossingGallery = require("../crossing_gallery"),
    should = require("should"),
    sinon = require("sinon"),
    fs = require("fs");

var cg = new CrossingGallery();

describe("Proxies", function () {
  var proxies = cg.proxies;
  
  Object.keys(proxies).forEach(function (name) {
    var proxy = proxies[name];
    
    describe("." + name, function () {
      describe(".search", function () {
        var photos = [];
        
        before(function (done) {
          var wrap = sinon.wrapMethod(proxy.libs.request.prototype, "get", function (options, callback) {
            var data = fs.readFileSync(__dirname + "/data/proxies." + name + ".search.test", "utf8");
            callback(data);
          });
          
          proxy.search({
            limit: 25,
            keyword: "ねこ"
          }, function (data) {
            photos = data;
            done();
          });
          
          wrap.restore();
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