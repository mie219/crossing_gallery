/*
 * crossing_gallery/proxies/photozou.js
 * photozou API wrapper
 */

function Proxy() {
  var req = new this.request("api.photozou.jp");
  
  this.search = function (options) {
    var path = "/rest/search_public",
        queries = options || {};
    
    req.get({
      path: path,
      queries: queries
    }, function (res) {
      var photos = this.xml_parse(res, "info > photo");
      
      // format photos info
      photos = photos.map(function (photo) {
        return {
          title   : photo.photo_title,
          url     : photo.image_url,
          original: photo.url,
          site    : "フォト蔵"
        };
      });
      
      this.data = photos;
      this.emit("success");
    }.bind(this));
    
    return this;
  };
}

module.exports = Proxy;