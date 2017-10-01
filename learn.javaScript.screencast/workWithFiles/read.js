var fs = require('fs');

// выводит буфер не декодированной информации
//__filename - путь к модулю
fs.readFile(__filename,function (err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log("Путь к модулю: " + __filename);
		console.log("Буфер:");
		console.log(data);
		// работа с буфером похожа на работу со строкой
		console.log(data[0]);       // получаем первый элемент буфера
		console.log(data.length);   //получаем длинну буфера
		// содержиме буфера можно менять, есть методы описаные в API (Buffer)
	}
});