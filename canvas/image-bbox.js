var BBOX = require('./bbox');
var ImageBBOX = function() {
	this.image = arguments[0];
	BBOX.apply(this, [].slice.apply(arguments).slice(1));
};
ImageBBOX.prototype = BBOX.prototype;
ImageBBOX.prototype.constructor = ImageBBOX;
module.exports = ImageBBOX;