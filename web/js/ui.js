/*
 * web/js/ui.js
 * define user interface
 */

$(function () {
  var html = "";
  var grid = ['1x1', '1x1', '1x1', '1x1', '1x1', '1x2', '1x2', '2x1', '2x1', '2x2'];
  var rand = 0;

  for (var i = 0; i < 24; i++) {
    rand = Math.ceil(Math.random() * 10);
    html += '<section class="grid' + grid[rand] + '"></section>';
  }
  html += '<div style="clear: both;"></div>';
  $("#img-grid").prepend(html);
});
