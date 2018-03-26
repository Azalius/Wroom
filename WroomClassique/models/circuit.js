/*
* config.Db contient les parametres de connection � la base de donn�es
* il va cr�er aussi un pool de connexions utilisables
* sa m�thode getConnection permet de se connecter � MySQL
*
*/

let db = require('../configDb');

/*
* R�cup�rer l'int�gralit� des circuits avec l'adresse de la photo du pays de l'�curie
* @return Un tableau qui contient le N� du circuit, le nom de la photo du drapeau du pays et le nom du circuit
*/
module.exports.getListeCircuits = function (callback) {
	db.getConnection(function(err, connexion){
        if(!err){
        	let sql ="SELECT CIRNUM, PAYADRDRAP, CIRNOM FROM circuit c INNER JOIN pays p ";
			sql= sql + "ON p.PAYNUM=c.PAYNUM";
            connexion.query(sql, callback);
            connexion.release();
         }
      });
};

module.exports.getInfosCircuits = function (num,callback) {
	db.getConnection(function(err, connexion){
        if(!err){
			let sql ="SELECT CIRNUM,CIRNOM,CIRLONGUEUR, CIRNBSPECTATEURS, CIRADRESSEIMAGE,CIRTEXT,p.PAYNUM,PAYNOM FROM circuit c INNER JOIN pays p ";
			sql+= "ON p.PAYNUM=c.PAYNUM ";
			sql+="WHERE CIRNUM="+num;
            connexion.query(sql, callback);
            connexion.release();
         }
      });
};

module.exports.getMenuCircuit = function (callback) {
	db.getConnection(function(err, connexion){
        if(!err){
			let sql ="SELECT CIRNUM,CIRNOM,CIRLONGUEUR,CIRNBSPECTATEURS FROM circuit ";
			sql+="ORDER BY CIRNOM";
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

module.exports.getPays = function (callback) {
	db.getConnection(function(err, connexion){
        if(!err){
			let sql ="SELECT PAYNUM,PAYNOM FROM pays ";
			sql+="ORDER BY PAYNOM";
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

module.exports.addCircuit=function(values,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="INSERT INTO circuit (PAYNUM,CIRNOM,CIRLONGUEUR,CIRNBSPECTATEURS,CIRADRESSEIMAGE,CIRTEXT) ";
			sql+="VALUES("+values.pays+",'"+values.nom+"',"+values.longueur+","+values.spectateur+",'"+values.adresseImage+"','"+values.description+"')";
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.updateCircuit=function(num,values,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="UPDATE circuit SET PAYNUM="+values.pays+",CIRNOM='"+values.nom+"',CIRLONGUEUR="+values.longueur+",CIRNBSPECTATEURS="+values.spectateur+",CIRADRESSEIMAGE='"+values.adresseImage+"',CIRTEXT='"+values.description+"' ";
			sql+="WHERE CIRNUM="+num;
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};

module.exports.deleteCircuit=function(num,callback){
	db.getConnection(function(err,connexion){
		if(!err){
			let sql="DELETE FROM course WHERE GPNUM IN (SELECT GPNUM FROM course WHERE PILNUM="+num+") ";
			sql+="DELETE FROM essais WHERE GPNUM IN (SELECT GPNUM FROM essais WHERE PILNUM="+num+") ";
			sql+="DELETE FROM grandprix,circuit ";
			sql+="WHERE CIRNUM="+num;
			connexion.query(sql,callback)
			connexion.release();
		}
	});
};
