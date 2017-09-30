var http = require('http');
var fs = require('fs');

/*
Обязвтельно орабатывать ошибки
не работает try-catch => cb(err)
есть соглашение о том что: первый агрумент функции оработчика всегда является ошибкой:
function cb(err,...)
при ошибке: cb(err);
без ошибки: cb(err,...);
 */
http.createServer(function (req, res) {
	var info;
	if (req.url === '/') {
		fs.readFile('index.html', function (err, info) {
			if (err) {
				console.log(err);
				res.statusCode = 500;
				res.end("Error on server!");
				return;
			}
			res.end(info);
		});
	} else {/* 404 */}
}).listen(3000); // слушает 3000 порт (Доступ к странице 127.0.0.1:3000)