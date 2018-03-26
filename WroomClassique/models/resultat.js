let db = require('../configDb');

module.exports.getListePrix = function(callback){
	db.getConnection(function(err, connexion){
		if(!err){
			let sql = "select gpnum, gpnom, payadrdrap FROM grandprix g, circuit c, pays p WHERE g.cirnum = c.CIRNUM and c.PAYNUM = p.PAYNUM";

			connexion.query(sql, callback);
			connexion.release();
		}
	});
};


module.exports.getResultatGP = function(gpnum, callback){
	db.getConnection(function(err, connexion){
		if(!err){
			let sql = "SELECT c.*, p.pilnom, p.pilprenom, tempscourse,";
      sql = sql + " @rownum := @rownum + 1 AS Place, CASE @rownum WHEN  1 then 25 WHEN  2 then 18 WHEN  3 then 15 WHEN  4 then 12 WHEN 5 then 10 WHEN  6 then 8 WHEN  7 then 6 WHEN 8 then 4 WHEN 9 then 2 WHEN 10 then 1 ELSE 0 END AS Points";
  		sql = sql + " FROM course c, pilote p,";
      sql = sql + " (SELECT @rownum := 0) r";
      sql = sql + " WHERE p.pilnum=c.pilnum AND c.gpnum="+gpnum;
      sql = sql + " ORDER BY c.tempscourse";

			connexion.query(sql, callback);
			connexion.release();
		}
	});
};
/*
SELECT c.*, p.PILNOM, p.PILPRENOM,
       @rownum := @rownum + 1 AS Place, CASE @rownum WHEN  1 then 25 WHEN  2 then 18 WHEN  3 then 15 WHEN  4 then 12 WHEN 5 then 10 WHEN  6 then 8 WHEN  7 then 6 WHEN 8 then 4 WHEN 9 then 2 WHEN 10 then 1 ELSE 0 END AS Points
  FROM course c, pilote p,
       (SELECT @rownum := 0) r
       WHERE p.PILNUM=c.PILNUM AND c.GPNUM=1
       ORDER BY c.TEMPSCOURSE
*/
/*
SET @rank=0;
SELECT t.gpcommentaire, t.pilnom, t.pilprenom, t.gpnum, t.tempscourse, p.ptnbpointsplace
FROM points p, (SELECT gpcommentaire, pilnom, pilprenom, gp.gpnum, tempscourse, @rank:=@rank+1 AS rank
				FROM pilote p, course c, grandprix gp
				WHERE gp.GPNUM=c.GPNUM and p.PILNUM = c.PILNUM and c.GPNUM=1
				ORDER BY tempscourse) t
WHERE CAST(t.rank AS CHAR)=CAST(p.ptplace AS CHAR)
*/

/*
SELECT gpcommentaire, pilnom, pilprenom, gp.gpnum, tempscourse
FROM pilote p, course c, grandprix gp
WHERE gp.GPNUM=c.GPNUM and p.PILNUM = c.PILNUM and c.GPNUM=1
ORDER BY tempscourse
*/

module.exports.getPointsParPlace = function(gpnum, callback){
	db.getConnection(function(err, connexion){
		if(!err){
			let sql = "SELECT ptplace, ptnbpointsplace FROM points";
			connexion.query(sql, callback);
			connexion.release();
		}
	});
};
