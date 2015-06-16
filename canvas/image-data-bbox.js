var BBOX = require('./bbox');
var ImageDataBBOX = function() {
	this.image = arguments[0];
	BBOX.apply(this, [].slice.apply(arguments).slice(1));	
};
ImageDataBBOX.prototype = BBOX.prototype;
ImageDataBBOX.prototype.constructor = ImageDataBBOX;
module.exports = ImageDataBBOX;