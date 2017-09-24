var User = require('./user/index');
var db = require('./db/index');
var log = require('./logger')(module);
db.connect();

function run() {
	var moon = new User('Moon');
	var mad = new User('Mad');
	moon.hello(mad);
	log(db.getPhrase('Run successful'));
}

//если у модуля есть родитель знаит мы экспортируем нужные свойства,
//если же нет то запускаем функцию run
if (module.parent) {
	exports.run = run;
} else {
	run();
}
