var Canvas = required('canvas'),
	Image = Canvas.Image,
	IMG = required('./img');

Canvas.prototype.load = function(fileName, callback) {
	IMG.loadPNG(fileName, function(result) {
		callback(result);
	}.bind(this));
};