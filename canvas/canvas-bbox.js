var BBOX = require('./bbox');
var CanvasBBOX = function() {
	this.canvas = arguments[0];
	BBOX.apply(this, arguments.slice(1));
};
CanvasBBOX.prototype = BBOX.prototype;
CanvasBBOX.prototype.constructor = CanvasBBOX;
module.exports = CanvasBBOX;