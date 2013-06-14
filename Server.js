try {
	var thrift = require('thrift-0.9.0');
	
	var clubs = require('./gen-nodejs/Clubs'),
		types = require('./gen-nodejs/service_types');
	
	
		var server = thrift.createServer(clubs, {
		  getNear: function(lon, lat, range, result) {
		    console.log("return:", lon, lat, range);
		    result(null, 4.5);
		  }
		}, {debug: true});
	
	server.listen(9090);

} catch(exc) {
	console.log(exc);
}