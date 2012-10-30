/*
 * apis/photozou.js
 * photozou API wrapper
 */

var Request = require("../lib/request"),
    xml_parse = require("../lib/xml_parse");

function API() {
  var req = new Request("api.photozou.jp");
  
  this.search = function (options, callback) {
    var path = "/rest/search_public",
        queries = options || {};
    
    if (typeof options !== "object")
      callback = options;
    
    req.get({
      path: path,
      queries: queries
    }, function (res) {
      var photos = xml_parse(res, "info > photo");
      
      // format photos info
      photos = photos.map(function (photo) {
        return {
          title   : photo.photo_title,
          url     : photo.image_url,
          original: photo.url,
          site    : "フォト蔵"
        };
      });
      
      callback(photos);
    });
  };
  
  this.public = function () {
    
  };
}

module.exports = new API();