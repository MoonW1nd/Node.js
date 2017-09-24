var EventEmitter = require('events').EventEmitter;

var db = new EventEmitter;
db.setMaxListeners(10);// установка максимального количества обработчиков(WARN! не забывать удалять обработчики)
// для отслеживания утечек памяти может помочь модуль heapdump
// emitter.listeners(event); - получить обработчики событий
// EventEmitter.listenerCount(emitter,type); - выодит количество обработчиков

function Request() {
	var self = this;
	var bigData = new Array(1e6).join('*');

	this.send = function (data) {
		console.log(data)
	};

	function onData(info) {
		self.send(info)
	}

	this.end = function () {
		db.removeListener('data',onData)
	};
	db.on('data', onData)
}

setInterval(function () {
	var request = new Request();
	request.end(); // если закоментировать а следоватьельно не удаллять обработчики событый
	// то это приводит к тому, что объект Request не удаляется, что приводит к утечке памяти
	// console.log(db);
	console.log(process.memoryUsage().heapUsed);
},200);