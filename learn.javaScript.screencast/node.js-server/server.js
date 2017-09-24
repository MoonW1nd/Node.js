var http = require('http');
var url = require('url');
/*
длинная форма записи создания сервера

создаем сервер
var server = new http.Server();

добавляем прослушку порта и ip
server.listen(1337,'127.0.0.1');

var counter = 0;
server.on('request',function (req, res) {
	res.end('Hello, world! ' + ++counter)
});
*/
var server = http.createServer(function (req, res) {
	console.log(req.method, req.url);
 	console.log(req.headers);

	var urlParse = url.parse(req.url, true);
	// console.log(urlParse);
	if (urlParse.pathname ==='/echo' && urlParse.query.message) {
		// res.writeHead(200,"OK",{'Cache-control': 'no-cache'}); // явный способ задания заголовков
		res.setHeader('Cache-control','no-cache'); //or removeHeader: добавление или удаление заголовков
		res.statusCode = 200; //OK
		res.end(urlParse.query.message)
	} else {
		res.statusCode = 404; //Page Not Found
		//403 - access denied
		//500 - server error
		res.end("Page not found!");
	}
});

server.listen(1337,'127.0.0.1');
