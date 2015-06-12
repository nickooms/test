var fs = require('fs'),
	xml2js = require('xml2js');

var color, parser = new xml2js.Parser();
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
					console.log(cell.img[0].$.src.split('/').reverse()[0].split('.')[0]);
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
}
module.exports = Color;