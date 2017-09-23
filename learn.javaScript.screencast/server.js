var user = require('./user');

var moon = new user.User('Moon');
var mad = new user.User('Mad');

moon.hello(mad);