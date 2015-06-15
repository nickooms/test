var RGB = function() {
	switch (arguments.length) {
		case 1:
			var color = arguments[0];
			switch (typeof color) {
				case 'string':
					this.r = parseInt(color.substr(1, 2), 16);
					this.g = parseInt(color.substr(3, 2), 16);
					this.b = parseInt(color.substr(5, 2), 16);
					break;
				default:
					console.log(color, typeof color);
					break;
			}
			break;
		case 3:
			this.r = arguments[0];
			this.g = arguments[1];
			this.b = arguments[2];
			break;
		default:
			alert(arguments);
			break;
	}
};
RGB.prototype.difference = function(rgb) {
	return {
		r: Math.abs(this.r - rgb.r),
		g: Math.abs(this.g - rgb.g),
		b: Math.abs(this.b - rgb.b)
	};
}
module.exports = RGB;