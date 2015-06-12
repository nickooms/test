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
  WMS = require('./wms');
  floodFill = require('./floodfill'),
  clc = require('cli-color'),
  Color = require('./color');

var FILE_NAME = 'wms.png';
process.stdout.write(clc.erase.screen);
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
}
