exports.myMiddleware = (req, res, next) => {
	req.messageMiddleware = 'Hello from Middleware';
	next();
};

exports.homePage = (req, res) => {
	console.log(req.messageMiddleware);
	res.render('hello', {name: 'wes', dog: 'Puppy'});
};