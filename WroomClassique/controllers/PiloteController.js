let model=require('../models/pilote.js');
let modelEcurie=require('../models/ecurie.js');
let modelPays=require('../models/pays.js');

var async=require('async');
// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.ListerLettres = function(request, response){
	response.title = 'Répertoire des pilotes';
	model.getInitiale(function(err,result){
		if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeInitiales = result;
        console.log(result);
        response.render('repertoirePilotes', response);
	});
 }

module.exports.ListerNoms=function(request,response){
    response.title='Liste Pilotes';
	var lettre=request.params.lettreNom;
	/*model.getListePilotesParInit(lettre,function(err,result){
	   if(err){
           console.log(err);
           return;
       }
        response.listePiloteParNom=result;
        console.log(result);
        response.render('listePiloteLettre',response);
    });*/

    async.parallel([
        function(callback){
            model.getInitiale(function(err,result){
               callback(null,result);
            });
        }, //fin callback0

        function(callback){
            model.getListePilotesParInit(lettre,function(err,result){
               callback(null,result);
            });
        }, //fin callback1

    ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.listeInitiales=result[0];
            response.listePiloteParNom=result[1];
            response.render('listePiloteLettre',response);
        }
    );//fin async
}

module.exports.InfosPilote=function(request,response){
    response.title='Détail Pilote';
    var num=request.params.numPilote;

    async.parallel([
        function(callback){
            model.getInitiale(function(err,result){
               callback(null,result);
            });
        }, //fin callback0

        function(callback){
            model.getInfosPilote(num,function(err,result){
               callback(null,result);
            });
        }, //fin callback1

        function(callback){
            model.getSponsorsPilote(num,function(err,result){
               callback(null,result);
            });
        }, //fin callback2

        function(callback){
            model.getPicsPilote(num,function(err,result2){
               callback(null,result2);
            });
        }, //fin callback3

        function(callback){
            model.getEtablePilote(num,function(err,result2){
               callback(null,result2);
            });
        }, //fin callback4
    ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.listeInitiales=result[0];
            response.detailPilote=result[1][0];
            response.sponsorsPilote=result[2];
            response.photosPilote=result[3];
            response.ecuriePilote=result[4];
            response.render('detailPilote',response);
        }
    );//fin async
}
