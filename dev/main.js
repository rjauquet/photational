var photational = function (args){
	
	
		
	
	if(!args || args.id === undefined){
		return undefined;
	} else {
		var self 		= {},				
			photational = {};

		self.id = args.id;

				

		photational.getId = function (){
			return self.id;
		};
		photational.setId = function (id){
			if(id !== undefined){
				self.id = id;
			}
			return photational;
		};

		return photational;
	}		
}

module.exports = photational;
