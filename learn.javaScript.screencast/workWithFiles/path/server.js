var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

var ROOT = __dirname + '/path';

//TODO:[A.Ivankov] create all files from lesson

http.createServer(function (req, res) {
	if (!checkAccess(req)) {
		res.writeHead(403);
		res.end('Tell me the secret to access!');
		return;
	}
	sendFileSafe(url.parse(req.url, true).pathname, res);

});

function checkAccess(req) {
	return url.parse(req.url, true).query.secret === 'o_O';
}

function sendFileSafe(filePath, res) {
	try {
		filePath = decodeURIComponent(filePath); // декодирование запроса
	} catch (e) {
		res.statusCode = 400;
		res.end('Bad Request');
		return;
	}

	if (~filePath.indexOf('\0')) { // проверка на нулевой байт
		res.statusCode = 400;
		res.end('Bad Request');
		return;
	}

	filePath = path.normalize(path.join(ROOT, filePath));

	if (filePath.indexOf(ROOT) !== 0) {
		res.statusCode = 404;
		res.end('File not found');
		return;
	}

	fs.stat(filePath, function (err, stats) {
		if (err || !stats.isFile()) {
			res.statusCode = 404;
			res.end('File not found');
			return;
		}

		sendFile(filePath, res)
	})
}

function sendFile(filePath, res) {
	fs.readFile(filePath, function (err, content) {
		if (err) throw err;

		var mime = require('mime').lookup(filePath);
		res.setHeader('Content-Type', mime + '; charset=utf-8');
		res.end(content);
	})
}