var SIZE = 512;
var Canvas = require('canvas')
  , Image = Canvas.Image  
  , http = require('http')
  , fs = require('fs')
  , request = require('request')
  , proj4 = require('proj4')
  , BBOX = require('./bbox.js');

function tile2Grid(file) {
	var coords = file.replace('.jpg', '').split(' ');
	return {
		file: file,
		x: parseInt(coords[0].replace('x=', '')),
		y: parseInt(coords[1].replace('y=', ''))
	};
}
var proj = '+proj=lcc +lat_1=51.16666723333334 +lat_2=49.83333389999999 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-99.1,53.3,-112.5,0.419,-0.83,1.885,-1.0 +units=m +no_defs';
console.log(proj4(proj, [4.405452,51.306477]));
fs.readdir(__dirname + '/streetview', function(err, files) {
	files = files.filter(function(file) {
		return file.indexOf('.jpg') != -1;
	});
	var bbox = new BBOX();
	files.map(tile2Grid).forEach(bbox.check.bind(bbox));
	var cols = 1 + bbox.width;
	var rows = 1 + bbox.height;
	var canvas = new Canvas(cols * SIZE, rows * SIZE)
  	, ctx = canvas.getContext('2d');
  files.map(tile2Grid).forEach(function(grid) {
		var col = (cols - 1) - (bbox.max.x - grid.x);
		var row = (rows - 1) - (bbox.max.y - grid.y);
		var x = col * SIZE;
		var y = row * SIZE;
		var image = fs.readFileSync(__dirname + '/streetview/' + grid.file);
		var img = new Image;
		img.src = image;
		ctx.drawImage(img, x, y);
		console.log(grid.file, col, row);
  });
  var out = fs.createWriteStream(__dirname + '/streetview.png'),
		stream = canvas.createPNGStream();
	stream.on('data', function(chunk){
	  out.write(chunk);
	});
});