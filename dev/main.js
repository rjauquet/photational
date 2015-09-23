var photational = function (args){	
	if(!args || args.id === undefined){
		return undefined;
	} else {
		var self      = {},				
			photation = {};

		self.id = args.id;

		canvas = document.getElementById(self.id);
		ctx = photation.canvas.getContext('2d');
		photation.canvas = canvas;
		photation.ctx = ctx;


		photation.getId = function (){
			return self.id;
		};

		photation.setId = function (id){
			if(id !== undefined){
				self.id = id;
			}
			return photation;
		};

		photation.drawRect = function (x,y,w,h,r,g,b,a){
			var a = a ? a : 1;
			ctx.fillStyle = 'rgba(' + r + ', ' + g  + ', ' + b  + ', ' + a  + ');';
            ctx.fillRect (x, y, w, h);
			return photation;
		}

		return photation;
	}		
}

module.exports = photational;
