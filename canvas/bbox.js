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
      this.min = new Point(arguments[0], arguments[1]);
      this.max = new Point(arguments[2], arguments[3]);
      break;
    default:
      this.min = new Point(Infinity, Infinity);
      this.max = new Point(-Infinity, -Infinity);
      break;
  }
};
var x = function() {
	return this.min.x;
};
var y = function() {
	return this.min.y;
};
var width = function() {
  return this.max.x - this.min.x;
};
var height = function() {
  return this.max.y - this.min.y;
};
Object.defineProperties(BBOX.prototype, {
	x: { get: x },
	y: { get: y },
  width: { get: width },
  height: { get: height }
});
BBOX.prototype.check = function(point) {
  this.min.substract(point);
  this.max.add(point);
};
BBOX.prototype.toString = function() {
  return this.toFixed(2);
};
BBOX.prototype.toFixed = function(digits) {
  return [this.min.toFixed(digits), this.max.toFixed(digits)].join(',');
};
module.exports = BBOX;
