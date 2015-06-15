var Canvas = require('canvas'),
<<<<<<< HEAD
	canvasTools = require('./canvas-tools'),
	alert = require('./alert'),
	Image = Canvas.Image,
	http = require('http'),
	fs = require('fs'),
	request = require('request'),
	download = require('./download'),
	IMG = require('./img'),
	BBOX = require('./bbox'),
	WMS = require('./wms');
	floodFill = require('./floodfill'),
	clc = require('cli-color'),
	Color = require('./color'),
	color2Xterm = require('color2xterm'),
	RGB = require('./rgb'),
	HSV = require('./hsv');

var FILE_NAME = '152512,221815,152688,221918.png';

function title(text, style) {
	console.log(clc.reset + center(text, style));
}
function center(text, style) {
	var width = clc.windowSize.width;
	var textLength = clc.strip(text).length;
	var left = parseInt((width - textLength) / 2);
	var right = width - (textLength + left);
	return fill(left, style) + text + fill(right, style);
}
function fill(nrCharacters, style) {
	style = style || {};
	style.fillCharacter = style.fillCharacter || ' ';
	var s = '';
	for (var i = 0; i < nrCharacters; i++)
		s += style.fillCharacter;
	return style.clc ? style.clc(s) : s;
}
var style = {
	fillCharacter: '=',
	clc: clc.bold.blueBright.bgXterm(73)
};
title(clc.bold.bgXterm(73).white('Converting ') + clc.underline.bold.bgXterm(73)(FILE_NAME), style);

if (process.argv.length > 2) {
	var canvas = new Canvas();
	var pieces = [];
	IMG.loadPNG(__dirname + '/streets/' + FILE_NAME, canvas, function (fileName) {
		var style = { '/': clc.magentaBright('/') };
		alert(clc.bold.bgBlackBright.white('Loaded ') + clc.bgBlackBright.whiteBright(clc.art(fileName, style)));
		var colors = IMG.findColors(canvas);
		var s = '';
		/*colors.sort(function(a, b) {
			var rgbA = new RGB(a[0]);
			var rgbB = new RGB(b[0]);
			return new HSV(rgbA.r, rgbA.g, rgbA.b).s < new HSV(rgbB.r, rgbB.g, rgbB.b).s ? -1 : 1;
		});*/
		for (var i = 0; i < colors.length; i++) {
			var color = colors[i][0];
			var colorNr = color2Xterm.hex2xterm(color);
			var c = clc.black.bgXterm(colorNr);
			s += c(color) + ' ';
		}
		console.log(s);
		pieces.push(IMG.fillAllPixels(canvas, '#cccccc', 0xff0000ff));
		pieces.push(IMG.fillAllPixels(canvas, '#b7b7b7', 0x00ff00ff));
		IMG.savePNG(__dirname + '/wms-1.png', canvas, function(fileName) {
			console.log('Saved ' + fileName);
			//alert(Color.find('#afafaf'));
		});
		/*var bbox = FILE_NAME.split('.')[0].split(',');
		bbox = new BBOX(bbox[0], bbox[1], bbox[2], bbox[3]);*/
		var bbox = new BBOX(FILE_NAME.split('.')[0]);
		console.log(bbox);
		for (var i = 0; i < pieces.length; i++) {
			var list = pieces[i];
			for (var j = 0; j < list.length; j++) {
				var img = list[j];
				img.fileName = i + '_' + j + '.png';
				var edges = [];
				if (img.x == 0)
					edges.push({ left: -img.w });
				if (img.y == 0)
					edges.push({ top: -img.h });
				if (img.x + img.w == img.image.width)
					edges.push({ right: img.x + img.w * 2 });
				if (img.y + img.h == img.image.height)
					edges.push({ bottom: img.y + img.h * 2 });
				if (edges.length > 0) {
					img.edges = edges;
					console.log(img.fileName + ' ' + img.x, img.y, img.w, img.h);
				} else {
					var w = canvas.width;
					var h = canvas.height;
					img.bbox = new BBOX(
						bbox.min.x + (img.x / w * bbox.width() / w),
						bbox.min.y + (img.y / h * bbox.height() / h),
						bbox.max.x - ((w - (img.w + img.x)) * bbox.width() / w),
						bbox.max.y - ((h - (img.h + img.y)) * bbox.height() / h)
					);
					img.fileName = img.bbox.toString() + '.png';
				}
			}
		}
		for (var i = 0; i < pieces.length; i++) {
			var list = pieces[i];
			for (var j = 0; j < list.length; j++) {
				var img = list[j];
				var c = new Canvas(img.image.width, img.image.height);
				c.getContext('2d').putImageData(img.image, 0, 0);
				var imageData = c.getContext('2d').getImageData(img.x, img.y, img.w, img.h);
				var saveCanvas = new Canvas(img.w, img.h);
				saveCanvas.getContext('2d').putImageData(imageData, 0, 0);
				IMG.savePNG(__dirname + '/images/'+ img.fileName, saveCanvas, function(fileName) {
					console.log('Saved ' + fileName);
				});
			}
		}
	});
} else {
	var bbox = new BBOX(152512, 221815, 152688, 221918);
	var query = WMS.query({
		layers: [
			WMS.WBN,
	//    WMS.WVB,
	//    WMS.WGO
		],
		bbox: bbox,
		size: 1000
	});
	download(query, __dirname + '/streets/' + bbox.toString() + '.png', function() {
		console.log('done');
	});
=======
  canvasTools = require('./canvas-tools'),
  alert = require('./alert'),
  Image = Canvas.Image,
  http = require('http'),
  fs = require('fs'),
  request = require('request'),
  download = require('./download'),
  IMG = require('./img'),
  BBOX = require('./bbox'),
  WMS = require('./wms');
  floodFill = require('./floodfill'),
  clc = require('cli-color'),
  Color = require('./color');

var FILE_NAME = 'wms.png';
process.stdout.write(clc.reset);
//alert(clc.reset + clc.bold.white('             Converting ') + clc.underline.bold(FILE_NAME));
var line = '';
for (var i = 0; i < 0xff; i++) {
  var msg = clc.black.bgXterm(i);
  line += msg(' ');
}
//console.log(line);
if (process.argv.length > 2) {
  var canvas = new Canvas();
  IMG.loadPNG(__dirname + '/' + FILE_NAME, canvas, function(fileName) {
    alert('Loaded ' + fileName);
    var colors = IMG.findColors(canvas);
    IMG.fillAllPixels(canvas, '#cccccc', 0xff0000ff);
    IMG.fillAllPixels(canvas, '#b7b7b7', 0x00ff00ff);
    IMG.savePNG(__dirname + '/wms-1.png', canvas, function(fileName) {
      console.log('Saved ' + fileName);
    });
  });
} else {
  var bbox = new BBOX(152512, 221815, 152688, 221918);
  var query = WMS.query({
    layers: [
      WMS.WBN,
      //    WMS.WVB,
      //    WMS.WGO
    ],
    bbox: bbox,
    size: 1000
  });
  download(query, __dirname + '/wms.png', function() {
    console.log('done');
  });
>>>>>>> efa30ad6b3dd8dee4eee772809ae4777ff7f11bd
}
