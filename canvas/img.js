var Canvas = require('canvas')
	,	Image = Canvas.Image
	,	fs = require('fs');
var IMG = function() {
	
};
function alert() {
	console.log(arguments[0]);
}
IMG.findColors = function(canvas) {
	//alert('Checking colors');
	var ctx = canvas.getContext('2d');
	var w = canvas.width;
	var h = canvas.height;
	var imageData = ctx.getImageData(0, 0, w, h);
	var color, colors = {}, data = imageData.data;
	for (var i = 0; i < data.length; i += 4) {
		color = '#' + ((data[i + 2] * 256 * 256) + data[i + 1] * 256 + data[i]).toString(16);
		if (colors[color] == null) {
			colors[color] = 1;
		} else {
			colors[color]++;
		}
	}
	var c = [];
	for (var color in colors) {
		c.push([color, colors[color]]);
	}
	c.sort(function(a, b) {
		return a[1] < b[1] ? -1 : 1;
	});
	//console.log(c);
	//console.log(c.length);
	ctx.putImageData(imageData, 0, 0);
	alert(c.length + ' different colors found');
	return c;
};
IMG.fillAllPixels = function(canvas, replaceColor, fillColor) {
	var result = true;
	while (result) {
		result = IMG.findPixel(canvas, replaceColor, fillColor);
	}
};
IMG.findPixel = function(canvas, replaceColor, fillColor) {
	var w = canvas.width, h = canvas.height;
	var i, color, offset, data = canvas.getContext('2d').getImageData(0, 0, w, h).data;
	for (var x = 0; x < w; x++) {
		for (var y = 0; y < h; y++) {
			i = (w * y + x) * 4;
			color = '#' + ((data[i + 2] * 256 * 256) + data[i + 1] * 256 + data[i]).toString(16);
			if (color == replaceColor) {
				floodFill(canvas, x, y, fillColor, 0xff);	    			
				return true;
			}
		}
	}
	return false;
};
IMG.loadPNG = function(fileName, callback) {
	fs.readFile(__dirname + '/wms.png', function(err, image) {
		var img = new Image;
		img.src = image;
		var w = img.width, h = img.height, canvas = new Canvas(w, h);
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, w, h);
		callback(canvas, fileName);
	});
}
IMG.savePNG = function(fileName, canvas, callback) {
	var out = fs.createWriteStream(fileName),
		stream = canvas.createPNGStream();
	stream.on('data', function(chunk) {
		out.write(chunk);
	});
	stream.on('end', function(chunk) {
		callback(fileName);
	});
}
module.exports = IMG;