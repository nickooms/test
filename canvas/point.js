var Point = function(x, y) {
	this.x = parseFloat(x);
	this.y = parseFloat(y);
};
Point.prototype.toFixed = function(digits) {
	return [this.x.toFixed(digits), this.y.toFixed(digits)].join(',');
};
Point.prototype.toString = function() {
	return this.toFoxed(2);
};
Point.prototype.add = function(point) {
	this.x = Math.max(this.x, point.x);
	this.y = Math.max(this.y, point.y);
};
Point.prototype.substract = function(point) {
	this.x = Math.min(this.x, point.x);
	this.y = Math.min(this.y, point.y);
};
module.exports = Point;