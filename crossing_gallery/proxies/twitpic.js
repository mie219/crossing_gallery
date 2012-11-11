/*
 * crossing_gallery/proxies/twitpic.js
 * twitpic API wrapper
 */

function Proxy() {
  var self = libs = this.libs;
  
  var req = new libs.request("api.twitpic.com");
  
  this.search = function (options, callback) {
    var path = "/2/tags/show.json",
        queries = options || {};
    
    if (typeof options !== "object") {
      callback = options;
      queries.tag = options.keyword ? options.keyword : "test";
    } else
      queries.tag = "test";
    
    req.get({
      path: path,
      queries: queries
    }, function (res) {
      var photos = JSON.parse(res).images;
      
      // format photos info
      photos = photos.map(function (photo) {
        return {
          title   : photo.message,
          url     : "http://twitpic.com/show/thumb/" + photo.short_id,
          original: "http://twitpic.com/" + photo.short_id,
          site    : "twitpic"
        };
      });
      
      callback(photos);
    });
  };
  
  this.public = function () {
    
  };
}

module.exports = Proxy;