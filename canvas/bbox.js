var BBOX = function() {
	if (arguments.length == 4) {
		this.min = {
			x: arguments[0],
			y: arguments[1]
		};
		this.max = {
			x: arguments[2],
			y: arguments[3]
		};
	} else {
		this.min = {
			x: Infinity,
			y: Infinity
		};
		this.max = {
			x: -Infinity,
			y: -Infinity
		};
	}
};
BBOX.prototype.check = function(point) {
	this.min.x = Math.min(this.min.x, point.x);
	this.min.y = Math.min(this.min.y, point.y);
	this.max.x = Math.max(this.max.x, point.x);
	this.max.y = Math.max(this.max.y, point.y);
};
BBOX.prototype.width = function() {
	return this.max.x - this.min.x;
};
BBOX.prototype.height = function() {
	return this.max.y - this.min.y;
};
module.exports = BBOX;