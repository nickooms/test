var alert = function() {
	var args = [];
	for (var i = 0; i < arguments.length; i++) {
		args.push(arguments[i]);
	}
	console.log(args.join(', '));
};
module.exports = alert;