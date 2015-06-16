var Canvas = require('canvas'),
	Image = Canvas.Image,
	fs = require('fs'),
	alert = require('./alert'),
	ImageBBOX = require('./image-bbox');
var IMG = function() {
	
};
IMG.findColors = function(canvas) {
	var ctx = canvas.getContext('2d');
	var w = canvas.width;
	var h = canvas.height;
	var imageData = ctx.getImageData(0, 0, w, h);
	var color, colorItem, colors = {}, data = imageData.data;
	for (var i = 0; i < data.length; i += 4) {
		color = ('#' + ((data[i + 2] * 0x100 * 0x100) + data[i + 1] * 0x100 + data[i]).toString(16)).toUpperCase();
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
	ctx.putImageData(imageData, 0, 0);
	alert(c.length + ' different colors found');
	return c;
};
IMG.fillAllPixels = function(canvas, replaceColor, fillColor) {
	var list = [];
	var result = true;
	while (result) {
		result = IMG.findPixel(canvas, replaceColor, fillColor);
		if (result != true && result != false) {
			list.push(result);
		}
	}
	return list;
};
IMG.findPixel = function(canvas, replaceColor, fillColor) {
	var w = canvas.width, h = canvas.height;
	var i, color, offset, data = canvas.getContext('2d').getImageData(0, 0, w, h).data;
	for (var x = 0; x < w; x++) {
		for (var y = 0; y < h; y++) {
			i = (w * y + x) * 4;
			color = '#' + ((data[i + 2] * 0x100 * 0x100) + data[i + 1] * 0x100 + data[i]).toString(16);
			if (color == replaceColor) {
				var result = floodFill(canvas, x, y, fillColor, 0xff);
				if (result.width != 0 && result.height != 0) {
					//var bbox = new ImageBBOX(result.image, result.x, result.y, result.x + result.width, result.y + result.height);
					//console.log(result.width, result.image.width);
					return { x: result.x, y: result.y, w: result.width, h: result.height, image: result.image };
				} else {
					return true;
				}
			}
		}
	}
	return false;
};
IMG.loadPNG = function(fileName, canvas, callback) {
	fs.readFile(fileName, function(err, image) {
		if (err)
			console.log(err);
		var img = new Image;
		img.src = image;
		var w = img.width;
		var h = img.height;
		canvas.width = w;
		canvas.height = h;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, w, h);
		callback(fileName);
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