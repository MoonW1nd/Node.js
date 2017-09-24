var utils = require('util');
var phrases;

function PhraseError(message) {
	this.message = message;//при наследовании устанавливаетс вручную
	Error.captureStackTrace(this, PhraseError);
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
