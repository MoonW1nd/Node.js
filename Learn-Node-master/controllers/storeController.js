exports.myMiddleware = (req, res, next) => {
	req.messageMiddleware = 'Hello from Middleware';
	next();
};

exports.homePage = (req, res) => {
	console.log(req.messageMiddleware);
	res.render('hello', {name: 'wes', dog: 'Puppy'});
};

exports.addStore = (req, res) => {
	res.render('editStore', { title: 'Add Store'});
};

exports.createStore = (req, res) => {
	console.log(req.body);
	res.json(req.body);
};