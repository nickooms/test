var WMS = function() {
	
};
WMS.PROXY = 'http://gdiviewer.agiv.be/proxy/RegularProxy.ashx?url=';
WMS.URL = 'http://geo.api.agiv.be/geodiensten/raadpleegdiensten/GRB/wms?';
WMS.GRB = 'GRB_BASISKAART';
WMS.WBN = 'GRB_WBN';
WMS.WGO = 'GRB_WGO';
WMS.WVB = 'GRB_WVB';
WMS.QUERY = {
	layers: WMS.GRB,
	exceptions: 'XML',
	format: "image/png",
	transparent: 'TRUE',
	version: '1.3.0',
	service: 'WMS',
	request: 'GetMap',
	styles: '',
	isBaseLayer: false,
	//realMinScale: 5000,
	//realMaxScale: 250,
	crs: 'EPSG:31370',
	//BBOX: '152631,221841,152632,221842',
	bbox: '152512,221815,152688,221918',
	width: 500,
	height: 500
};
WMS.query = function(options) {
	var query = WMS.QUERY;
	options = options || {};
	if (options.layers != undefined) {
		if (options.layers instanceof Array) {
			query.layers = options.layers.join(',');	
		} else {
			query.layers = options.layers;
		}
	}
	if (options.size != undefined) {
		query.width = options.size;
		query.height = options.size;
	}
	if (options.bbox != undefined) {
		var bbox = options.bbox;
		var w = bbox.width;
		var h = bbox.height;
		var aspectRatio = w / h;
		if (aspectRatio > 1) {
			query.height = parseInt(query.height / aspectRatio);
		} else {
			query.width = parseInt(query.width * aspectRatio);
		}
	}
	var queryParams = [];
	for (var queryParam in query) {
		queryParams.push(queryParam + '=' + query[queryParam]);
	}
	var url = WMS.PROXY + WMS.URL + queryParams.join('&');
	return url;
};
module.exports = WMS;