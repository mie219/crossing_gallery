/**
 * crossing_gallery/index.js
 * Crossing Gallery class
 */

var fs = require("fs"),
    url = require("url"),
    http = require("http"),
    libs = require("./libs");

var methods = {
  apis    : require("./apis"),
  modules : require("./modules"),
  proxies : require("./proxies")
};

function CrossingGallery() {
  this.listen = function (port, host, prefix) {
    // server start
    http.createServer(function (req, res) {
      var path = url.parse(req.url).pathname,
          ctrl = path.split(prefix)[1],
          modules = "./modules/";
      
      if (ctrl) {
        ctrl = ctrl.split("/");
        modules += ctrl[0];
        console.log(modules);
        
        if (fs.exitsSync(modules)) {
          console.log("あーー。");
          var module = require(modules);
          console.log("success");
          res.writeHead(403, {});
        } else
          res.writeHead(404, {});
      } else
        res.writeHead(404, {});
      
      console.log(path, ctrl);
      
      res.end();
    }).listen(port, host ? host : "0.0.0.0");
  };
}

// libs の継承
Object.keys(methods).forEach(function (name) {
  var objects = methods[name];
  Object.keys(objects).forEach(function (name) {
    var constructor = objects[name];
    constructor.prototype.libs = libs;
    objects[name] = new constructor;
  });
  CrossingGallery.prototype[name] = objects;
});

module.exports = CrossingGallery;