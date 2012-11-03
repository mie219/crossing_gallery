/**
 * crossing_gallery/index.js
 * Crossing Gallery class
 */

var http = require("http"),
    url = require("url"),
    fs = require("fs"),
    apis = require("./apis"),
    modules = require("./modules"),
    proxies = require("./proxies");

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

CrossingGallery.prototype = {
  apis: apis,
  modules: modules,
  proxies: proxies
};

module.exports = CrossingGallery;