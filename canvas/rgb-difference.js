var RGBDifference = function() {
	switch (arguments.length) {
		case 2:
			this.a = arguments[0];
			this.b = arguments[1];
			//console.log(this.a, this.b);
			break;
		default:
			console.log('ERROR'+arguments);
			break;
	}
};
RGBDifference.prototype.toInt = function() {
	var r = Math.abs(this.a.r - this.b.r);
	var g = Math.abs(this.a.g - this.b.g);
	var b = Math.abs(this.a.b - this.b.b);
	//console.log(r, g, b);
	return r = b + g;
};
module.exports = RGBDifference;