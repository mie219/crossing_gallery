/**
 * crossing_gallery/libs/index.js
 * Libraries index
 */

var events = require("events");

var libs = {};
libs = new events.EventEmitter();
libs.request = require("./request");
libs.xml_parse = require("./xml_parse");

module.exports = libs;