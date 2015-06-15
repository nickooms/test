var BBOX = require('./bbox');
var CanvasBBOX = function() {
	this.apply(new BBOX(arguments));
};
CanvasBBOX.prototype = BBOX.prototype;
module.exports = CanvasBBOX;