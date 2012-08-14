/*
 * web/js/crossing_gallery.js
 * CrossingGallery class
 */

function CrossingGallery(url) {
  var request = function (type, method, callback) {
    $.ajax({
      type: type,
      url: url + "/api/" + method,
      dataType: "json",
      success: function (data) {
        callback(data);
      },
      error: function (err) {
        console.log(err);
      }
    });
  };
  this.view = function () {
    request("GET", "view", function (data) {
      for (var i = 0, len = data.length; i < len; i++) {
        data[i].thumbnaial;
      }
    });
  };
} 
