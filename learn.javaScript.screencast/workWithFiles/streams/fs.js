var fs = require('fs');

var stream = new fs.ReadStream(__filename, {encoding: 'utf-8'});

stream.on('readable', function () {
	var data = stream.read();
	if (data !== null) {
		console.log(data);
	}
});

stream.on('end', function () {
	console.log('the End')
});

stream.on('error', function (e) {
	if (e.code === 'ENOENT') {
		console.log('File not found!');
	} else {
		console.log(e);
	}
});
