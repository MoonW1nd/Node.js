var db = require('../db/index');
var log = require('../logger')(module);

function User(name) {
	this.name = name;
}

User.prototype.hello = function (who) {
	try {
		log(db.getPhrase("Hello") + ', '+ who.name);
	} catch (e) {
		console.error("Ошибка: %s\n сообщение: %s\n stack: %s\n",e.name, e.message, e.stack);
	}
};

module.exports = User;

// ==========  Блок ===============
// ==========Заметок===============


// module.exports = exports = this
/* module.exports = User; - экспортируемый объект и будет функцие User, то есть не нужна прослойка в виде объекта:
 var user = require('./user');

 function run() {
 var moon = new user.User('Moon');
 var mad = new user.User('Mad');
 moon.hello(mad);
 }
 а можно будет писать просто:
 var User = require('./user');

 function run() {
 var moon = new User('Moon');
 var mad = new User('Mad');
 moon.hello(mad);
 }
 */

// global variables:
// global.User = User;

//Строение объекта module:

// Module {
// 	id: '/Users/1/Sites/Education/Node/learn.javaScript.screencast/user/index.js', - полный путь к файлу
// 		exports: { User: [Function: User] }, - то что выдается наружу
// 	parent: - ссылка на родительский модуль который подключает данный модуль
// 		Module {
// 		id: '.',
// 			exports: {},
// 		parent: null,
// 			filename: '/Users/1/Sites/Education/Node/learn.javaScript.screencast/server.js',
// 			loaded: false,
// 			children: [ [Circular] ],
// 			paths:
// 		[ '/Users/1/Sites/Education/Node/learn.javaScript.screencast/node_modules',
// 			'/Users/1/Sites/Education/Node/node_modules',
// 			'/Users/1/Sites/Education/node_modules',
// 			'/Users/1/Sites/node_modules',
// 			'/Users/1/node_modules',
// 			'/Users/node_modules',
// 			'/node_modules' ] },
// 	filename: '/Users/1/Sites/Education/Node/learn.javaScript.screencast/user/index.js',
// 		loaded: false, - загрузился  ли модуль
// 		children:
// 	[ Module {
// 		id: '/Users/1/Sites/Education/Node/learn.javaScript.screencast/user/ru.json',
// 		exports: [Object],
// 		parent: [Circular],
// 		filename: '/Users/1/Sites/Education/Node/learn.javaScript.screencast/user/ru.json',
// 		loaded: true,
// 		children: [],
// 		paths: [Object] } ],
// 		paths:
// 	[ '/Users/1/Sites/Education/Node/learn.javaScript.screencast/user/node_modules',
// 		'/Users/1/Sites/Education/Node/learn.javaScript.screencast/node_modules',
// 		'/Users/1/Sites/Education/Node/node_modules',
// 		'/Users/1/Sites/Education/node_modules',
// 		'/Users/1/Sites/node_modules',
// 		'/Users/1/node_modules',
// 		'/Users/node_modules',
// 		'/node_modules' ] }
