var Canvas = require('canvas'),
	Image = Canvas.Image,
	IMG = require('./img');

Canvas.prototype.load = function(fileName, callback) {
	IMG.loadPNG(fileName, function(result) {
		callback(result);
	}.bind(this));
};
Canvas.prototype.save = function(fileName, callback) {
	IMG.savePNG(fileName, this, function(fileName) {
		callback(fileName);
	});
};