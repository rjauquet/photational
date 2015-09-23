var photational = require('../../dev/main.js');
var main = (function (){	
	var photation = photational({ id: 'photation' });
	photation.drawRect(10, 10, 50, 50, 200, 0, 0, 0.5);
	photation.drawRect(30, 30, 50, 50, 0, 0, 200, 0.5);
})();

module.exports = main;
