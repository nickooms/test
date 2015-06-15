var Point = require('./point');
var BBOX = function() {
	switch (arguments.length) {
		case 1:
			if (typeof arguments[0] == 'string') {
				var bbox = arguments[0].split(',');
				this.min = new Point(bbox[0], bbox[1]);
				this.max = new Point(bbox[2], bbox[3]);
			}
			break;
		case 4:
			/*this.min = {
				x: parseFloat(arguments[0]),
				y: parseFloat(arguments[1])
			};*/
			this.min = new Point(arguments[0], arguments[1]);
			/*this.max = {
				x: parseFloat(arguments[2]),
				y: parseFloat(arguments[3])
			};*/
			this.max = new Point(arguments[2], arguments[3]);
			break;
		default:
			/*this.min = {
				x: Infinity,
				y: Infinity
			};*/
			this.min = new Point(Infinity, Infinity);
			/*this.max = {
				x: -Infinity,
				y: -Infinity
			};*/
			this.max = new Point(-Infinity, -Infinity);
			break;
	}
};
BBOX.prototype.check = function(point) {
	/*this.min.x = Math.min(this.min.x, point.x);
	this.min.y = Math.min(this.min.y, point.y);*/
	this.min.substract(point);
	/*this.max.x = Math.max(this.max.x, point.x);
	this.max.y = Math.max(this.max.y, point.y);*/
	this.max.add(point);
};
BBOX.prototype.width = function() {
	return this.max.x - this.min.x;
};
BBOX.prototype.height = function() {
	return this.max.y - this.min.y;
};
BBOX.prototype.toString = function() {
	//return [this.min.x.toFixed(2), this.min.y.toFixed(2), this.max.x.toFixed(2), this.max.y.toFixed(2)].join(',');
	return this.toFixed(2);
};
BBOX.prototype.toFixed = function(digits) {
	//return [this.min.x.toFixed(digits), this.min.y.toFixed(digits), this.max.x.toFixed(digits), this.max.y.toFixed(digits)].join(',');
	return [this.min.toFixed(digits), this.max.toFixed(digits)].join(',');
};
module.exports = BBOX;