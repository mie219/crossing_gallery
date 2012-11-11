/*
 * crossing_gallery/proxies/photozou.js
 * photozou API wrapper
 */

function Proxy() {
  var self = libs = this.libs;
  
  var req = new libs.request("api.photozou.jp");
  
  this.search = function (options, callback) {
    var path = "/rest/search_public",
        queries = options || {};
    
    if (typeof options !== "object")
      callback = options;
    
    req.get({
      path: path,
      queries: queries
    }, function (res) {
      var photos = libs.xml_parse(res, "info > photo");
      
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

module.exports = Proxy;