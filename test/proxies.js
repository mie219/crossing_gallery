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
          var wrap = sinon.wrapMethod(proxy.request.prototype, "get", function (options, callback) {
            var test_file = __dirname + "/data/proxies." + name + ".search.test";
            var data = fs.readFile(test_file, "utf8", function (err, data) {
              if (err)
                throw err;
              callback(data);
            });
          });
          
          proxy.search({
            limit: 25,
            keyword: "ねこ"
          }).on("success", function () {
            photos = this.data;
            done();
          });
          
          wrap.restore();
        });
        
        it("検索結果は要素が1つ以上の配列", function () {
          photos.should.be.a("object");
          photos.should.be.an.instanceOf(Array);
          photos.should.not.be.empty;
        });
        
        it("検索結果は正しいフォーマット", function () {
          photos.forEach(function (photo) {
            photo.should.have.property("title");
            
            photo.should.have.property("url");
            photo.url.should.not.be.empty;
            photo.url.should.match(/^https?:\/\/.+$/);
            
            photo.should.have.property("original");
            photo.url.should.not.be.empty;
            photo.url.should.match(/^https?:\/\/.+$/);
            
            photo.should.have.property("site");
            photo.site.should.not.be.empty;
          });
        });
      });
    });
  });
});