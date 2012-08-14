/* 
 * server.js
 * server side application
 */

var proxy = require("http-proxy"),
    nws = require("node-web-server"),
    CrossingGallery = require("lib/crossing_gallery.js");

// proxy settings
proxy.createServer({
  router: {
    ".+/api": "localhost:8080",
    ".+": "localhost:8080"
  }
}).listen(80);

nws.run("config/http.conf");

// API
/*
var cg = new CrossingGallery();
cg.require("views");
cg.require("modules");
cg.require("proxies");
cg.run();
*/