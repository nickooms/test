var clc = require('cli-color');

var Style = function() {	
};

Style.FILE_NAME = { '/': clc.magentaBright('/') };
Style.FILE = clc.bold.bgBlackBright.magentaBright;

Style.title = function(text, style) {
	console.log(clc.reset + Style.center(text, style));
}
Style.center = function(text, style) {
	var width = clc.windowSize.width;
	var textLength = clc.strip(text).length;
	var left = parseInt((width - textLength) / 2);
	var right = width - (textLength + left);
	return Style.fill(left, style) + text + Style.fill(right, style);
}
Style.fill = function(nrCharacters, style) {
	style = style || {};
	style.fillCharacter = style.fillCharacter || ' ';
	var s = '';
	for (var i = 0; i < nrCharacters; i++)
		s += style.fillCharacter;
	return style.clc ? style.clc(s) : s;
}
Style.fileName = function(fileName) {
	return clc.bgBlackBright.whiteBright(clc.art(fileName, Style.FILE_NAME));
}
Style.fileAction = function(action, fileName) {
	var width = clc.windowSize.width;
	var text = Style.FILE(action + ' ') + Style.fileName(fileName.replace(__dirname, '.'));
	text += Style.FILE(Style.fill(width - clc.strip(text).length));
	return text;
}
module.exports = Style;