//Постое применение EE
//аргументы передаются по цепочке, обработчики срабатывают в том же порядке что и назначены

var EventEmitter = require('events').EventEmitter;

var server = new EventEmitter;

//вешаем обработчики событий
server.on('request',function (request) {
	request.approved = true;
});
server.on('request',function (request) {
	console.log(request)
});

//вызываем события
server.emit('request',{form: 'Client'});
server.emit('request',{from: 'Another Client'});

