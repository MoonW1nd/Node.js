var utils = require('util');
var phrases;

function PhraseError(message) {
	this.message = message;//при наследовании устанавливаетс вручную
	Error.captureStackTrace(this, PhraseError); // получение стека в движке V8
}
utils.inherits(PhraseError,Error);
PhraseError.prototype.name = 'PhraseError';

exports.connect = function () {
	phrases = require('./ru');
};

exports.getPhrase = function (name) {
	if(!phrases[name]) {
		throw new PhraseError("Нет такой фразы: " + name);
	}
	return phrases[name];
};

// HTTP 404
function HttpError(status, message) {
	this.status = status;
	this.message = message;
	Error.captureStackTrace(this, HttpError);
}

utils.inherits(HttpError,Error);
HttpError.prototype.name = 'HttpError';

function makePage(url) {
	if (url !== 'index.html') {
		throw new HttpError(404, "Нет такой страницы"); // HTTP 404
	}
}

try {
	var page = makePage('inde.html');
	console.log(page);
} catch (e) {
	if (e instanceof HttpError) {
		console.log(e.status, e.message);
	}
}