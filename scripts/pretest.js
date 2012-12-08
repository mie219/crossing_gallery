/**
 * scripts/pretest.js
 * preparing test files
 */

var CrossingGallery = require("../crossing_gallery"),
    sinon = require("sinon"),
    path = require("path"),
    fs = require("fs");

var cg = new CrossingGallery();

var proxies = cg.proxies;

Object.keys(proxies).forEach(function (name) {
  var proxy = proxies[name],
      test_file = "test/data/proxies." + name + ".search.test";
  
  // check test file exists
  (fs.exists || path.exists)(test_file, function (exists) {
    if (exists)
      return console.log("exists: %s", test_file);
    
    function save(res) {
      // save test file
      fs.writeFile(test_file, res, "utf8", function (err) {
        if (err)
          throw err;
        console.log("saved: %s", test_file);
      });
    }
    
    // wrap request.get method
    var wrap = sinon.wrapMethod(proxy.request.prototype, "get", function (options) {
      options.method = "GET";
      options.host = options.host ? options.host : this.host;
      this.send(options, save);
    });
    
    // call proxy.search method
    proxy.search({
      limit: 25,
      keyword: "ねこ"
    });
    
    // unwrap
    wrap.restore();
  });
});