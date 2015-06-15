var Canvas = require('canvas'),
	canvasTools = require('./canvas-tools'),
	alert = require('./alert'),
	Image = Canvas.Image,
	http = require('http'),
	fs = require('fs'),
	request = require('request'),
	download = require('./download'),
	IMG = require('./img'),
	BBOX = require('./bbox'),
	CanvasBBOX = require('./canvas-bbox'),
	WMS = require('./wms');
	floodFill = require('./floodfill'),
	clc = require('cli-color'),
	Color = require('./color'),
	color2Xterm = require('color2xterm'),
	RGB = require('./rgb'),
	HSV = require('./hsv'),
	Style = require('./style-command-line');

var FILE_NAME = '152512,221815,152688,221918.png';

var style = {
	fillCharacter: '=',
	clc: clc.bold.blueBright.bgXterm(73)
};
Style.title(clc.bold.bgXterm(73).white('Converting ') + clc.underline.bold.bgXterm(73)(FILE_NAME), style);

if (process.argv.length > 2) {
	var canvas = new Canvas();
	var pieces = [];
	IMG.loadPNG(__dirname + '/streets/' + FILE_NAME, canvas, function (fileName) {
		alert(Style.fileAction('Loaded', fileName));
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
			alert(Style.fileAction('Saved', fileName));
			//alert(Color.find('#afafaf'));
		});
		/*var bbox = FILE_NAME.split('.')[0].split(',');
		bbox = new BBOX(bbox[0], bbox[1], bbox[2], bbox[3]);*/
		var bbox = new BBOX(FILE_NAME.split('.')[0]);
		//console.log(bbox);
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
					//console.log(img.fileName + ' ' + img.x, img.y, img.w, img.h);
				} else {
					var w = canvas.width;
					var h = canvas.height;
					img.bbox = new BBOX(
						bbox.min.x + (img.x / w * bbox.width / w),
						bbox.min.y + (img.y / h * bbox.height / h),
						bbox.max.x - ((w - (img.w + img.x)) * bbox.width / w),
						bbox.max.y - ((h - (img.h + img.y)) * bbox.height / h)
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
					alert(Style.fileAction('Saved', fileName));
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
}
