var fs = require('fs'),
<<<<<<< HEAD
	xml2js = require('xml2js'),
	alert = require('./alert'),
	RGB = require('./rgb'),
	RGBDifference = require('./rgb-difference');

var Color = function() {
};
Color.colors = [];

/*var color, parser = new xml2js.Parser();
=======
	xml2js = require('xml2js');

var color, parser = new xml2js.Parser();
>>>>>>> efa30ad6b3dd8dee4eee772809ae4777ff7f11bd
fs.readFile(__dirname + '/color-table.html', function(err, data) {
	parser.parseString(data, function (err, result) {
		var rows = result.table.tr;
		var colors = [];
		for (var i = 0; i < rows.length; i++) {
			var cells = rows[i].td;
			for (var j = 0; j < cells.length; j++) {
				var cell = cells[j];
				if (typeof cell == 'string') {
					color = { nr: parseInt(cell) };
				} else {
<<<<<<< HEAD
					color.code = ('#' + cell.img[0].$.src.split('/').reverse()[0].split('.')[0]).toUpperCase();
					Color.colors.push(color);
				}
			}
		}
		console.log('Done parsing terminal colors');
	});
});
Color.rgb = function(color) {
	return {
		r: parseInt(color.substr(1, 2), 16),
		g: parseInt(color.substr(3, 2), 16),
		b: parseInt(color.substr(5, 2), 16)
	};
};
Color.find = function(color) {
	var rgb = new RGB(color);
	var colors = Color.colors.map(function(color) {
		var c = new RGB(color.code);
		return {
			nr: color.nr,
			difference: new RGBDifference(c, rgb)
		};
	});
	colors.sort(function(a, b) {
		return a.difference.toInt() > b.difference.toInt() ? 1 : -1;
	});
	return colors[0].nr;
};*/
Color.load = function() {
=======
					//console.log(cell.img[0].$.src.split('/').reverse()[0].split('.')[0]);
					colors.push(color);
				}
			}
		}
		//console.dir(result);
		//console.log('Done');
	});
});

var Color = function() {
};
Color.load = function() {
//	fs.read
>>>>>>> efa30ad6b3dd8dee4eee772809ae4777ff7f11bd
}
module.exports = Color;