exports.homePage = (req, res) => {
	res.render('hello', {name: 'wes', dog: 'Puppy'});
};