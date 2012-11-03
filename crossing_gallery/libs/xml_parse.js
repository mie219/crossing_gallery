/**
 * crossing_gallery/libs/xml_parse.js
 * XML parser wrapper
 */

var cheerio = require("cheerio");

function xml_parse(xml, selector) {
  var $ = cheerio.load(xml, {
    ignoreWhitespace: true,
    xmlMode: true
  });
  var $photos = $(selector);
  var photos = $photos.map(function (i) {
    var item = {};
    
    $(this).children().each(function (i) {
      var $elem = $(this);
      item[$elem[0].name] = $elem.text();
    });
    
    return item;
  });
  return photos;
}

module.exports = xml_parse;