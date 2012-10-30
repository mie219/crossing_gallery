/* 
 * server.js
 * server side application
 */

// settings
var proxy_port = 8888,
    api_port = 8000,
    api_prefix = "/api/";

var fs = require("fs"),
    proxy = require("http-proxy"),
    nws = require("node-web-server"),
    CrossingGallery = require("./lib/crossing_gallery.js");

// create logs dir
if (! fs.existsSync(__dirname + "/logs"))
  fs.mkdirSync("logs");

// route settings
var router = {};
router["[0-9a-zA-Z-.]+" + api_prefix] = "localhost:" + api_port;
router[".+"] = "localhost:8080";

// proxy settings
proxy.createServer({
  router: router
}).listen(proxy_port);

// static server
nws.run("config/http.conf");

// Crossing Gallery server
var cg = new CrossingGallery();
cg.listen(api_port, "localhost", api_prefix);

console.log("Proxy server running at http://127.0.0.1:" + proxy_port + "/");