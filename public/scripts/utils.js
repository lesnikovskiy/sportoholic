//this is used to parse the profile
String.prototype.fromBase64 = function () {
	var str = this;
	
	var output = str.replace('-', '+').replace('_', '/');
	
	switch (output.length % 4) {
		case 0:
			break;
		case 2:
			output += '==';
			break;
		case 3:
			output += '=';
			break;
		default:
			throw 'Illegal base64url string!';
	}
	
	return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
};