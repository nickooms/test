var Canvas = require('canvas'),
  Image = Canvas.Image,
  http = require('http'),
  fs = require('fs'),
  request = require('request'),
  download = require('./download'),
  IMG = require('./img'),
  BBOX = require('./bbox'),
  WMS = require('./wms');
  floodFill = require('./floodfill');

if (process.argv.length > 2) {
	IMG.loadPNG(__dirname + '/wms.png', function(canvas, fileName) {
		console.log('Loaded ' + fileName);
		IMG.findColors(canvas);
	  IMG.fillAllPixels(canvas, '#cccccc', 0xff0000ff);
	  IMG.fillAllPixels(canvas, '#b7b7b7', 0x00ff00ff);
	  IMG.savePNG(__dirname + '/wms-1.png', canvas, function(fileName) {
	  	console.log('Saved ' + fileName)
	  });
	});
  /*fs.readFile(__dirname + '/wms.png', function(err, image) {
    img = new Image;
    img.src = image;
    var w = img.width, h = img.height, canvas = new Canvas(w, h);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);

    IMG.findColors(canvas);
	  IMG.fillAllPixels(canvas, '#cccccc', 0xff0000ff);
	  IMG.fillAllPixels(canvas, '#b7b7b7', 0x00ff00ff);

	  IMG.savePNG(__dirname + '/wms-1.png', canvas, function(fileName) {
	  	console.log('Saved ' + fileName)
	  });
  });*/
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
/*http.get(url, function(res) {
	console.log('Downloading image');
	res.on('data', function(chunk) {
		console.log('chunk');	
		data += chunk;
  	//console.log(ctx.);
	});
	res.on('end', function() {
		console.log('end');
		//console.log(data);
		fs.writeFile(__dirname + '/wms.png', data, 'binary', function(err, d) {
      //callback(err, path)
      console.log('error');
      console.log(err || d);
    })
		var img = new Image();
  	img.onload = function(e) {
  		console.log('onload');
  		var image = e.target;
  		var ctx = canvas.getContext('2d');
  		ctx.drawImage(image, 0, 0);
  		console.log(__dirname);
	  	var out = fs.createWriteStream(__dirname + '/wms.png'),
	  		stream = canvas.createPNGStream();

			stream.on('data', function(chunk){
			  out.write(chunk);
			});
  	}
  	img.src = data;
	})
});*/
//console.log(url);
