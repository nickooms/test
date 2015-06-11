var Canvas = require('canvas'),
	Image = Canvas.Image,
	IMG = require('./img');

Canvas.prototype.load = function(fileName, callback) {
	IMG.loadPNG(fileName, function(result) {
		callback(result);
	}.bind(this));
};