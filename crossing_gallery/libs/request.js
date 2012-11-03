/**
 * crossing_gallery/libs/request.js
 * Request
 */

var http = require("http");

function request(host) {
  var req = {};
  
  req.get = function (options, callback) {
    options.method = "GET";
    options.host = options.host ? options.host : host;
    send(options, callback);
  };
  
  return req;
}

function send(options, callback) {
  var reqOpt = {
    host: options.host,
    path: options.path,
    method: options.method
  };
  // if basic
  if (options.basic)
    reqOpt.auth = options.basic.join(":");
  
  // if GET parameter
  if (options.queries) {
    var query_string = "?" + Object.keys(options.queries).map(function (key, index) {
      return [key, options.queries[key]].map(encodeURIComponent).join("=");
    }).join("&");
    reqOpt.path += query_string !== "?" ? query_string : "";
  }
  
  var req = http.request(reqOpt, function (res) {
    var data = "";
    res.setEncoding("utf8");
    res.on("data", function (chunk) {
      data += chunk;
    });
    res.on("end", function () {
      callback(data);
    })
  });
  
  req.on("error", function (e) {
    console.error(e.message);
  });
  
  req.end();
}

module.exports = request;