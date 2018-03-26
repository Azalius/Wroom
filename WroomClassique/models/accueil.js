let db = require('../configDb');

module.exports.getLastRes = function(callback){
	db.getConnection(function(err, connexion){
		if(!err){
			let sql = "SELECT gpnom, DATE_FORMAT(gpdate, "+'"%d/%m/%Y"'+") as gpdate, gpnum FROM grandprix ORDER BY gpdate LIMIT 1";
			//console.log(sql);
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};

module.exports.getLastUpd = function(callback){
	db.getConnection(function(err, connexion){
		if(!err){
			let sql = "SELECT DATE_FORMAT(gpdatemaj, "+'"%d/%m/%Y"'+") as gpdatemaj FROM grandprix ORDER BY gpdatemaj DESC LIMIT 1";
			//console.log(sql);
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};
