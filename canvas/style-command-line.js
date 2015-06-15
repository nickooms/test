var Style = function() {
	
};
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
module.exports = Style;