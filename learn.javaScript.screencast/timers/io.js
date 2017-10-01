var fs = require('fs');

fs.open(__filename,"r",function (err, file) {
	console.log('IO!')
});

setImmediate(function () {
	console.log('immediate');
});

process.nextTick(function () { //выполняемая функция будет асинхронной: она будет выполнена
// после Js вычеслений но до процессов ввода/вывода
	console.log('Next Tick')
});