var http = require('http');

var server = http.createServer(function (req, res) {
	/* any actions */
}).listen(3000);

// close server after 2.5s working
setTimeout(function () {
	/*server.close(function () {
		// 1-ый способ
		// process.exit(); // убивает процесс когда он завершен
		//2-ой способ
		clearInterval(timer);
	});
	*/
	server.close();
},2500);

/* каждую секунду получаем данные об использованноей памяти
пока есть активные таймеры libUV не может завершить процесс поэтому если не использовать
cb в :8 в функции server.close(), то процесс бедет продолжаться бесконечно
*/
var timer = setInterval(function () {
	console.log(process.memoryUsage());
},1000);

timer.unref(); // unref - указыват libUv что этот таймер второстепенный и не будет учитываться
// при проверке внутренних watcher'ов при завершение работы сервера / ref - противоположный метод
// так же эти методы есть у серверов и сетевых сокетов,