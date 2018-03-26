let model=require('../models/circuit.js');
var async=require('async');
// ////////////////////// L I S T E R     C I R C U I T S

module.exports.ListerCircuits = function(request, response){
    response.title = 'Liste des circuits';
	model.getListeCircuits(function(err,result){
		if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeCircuits=result;
        //console.log(result);
        response.render('listerCircuit', response);
	});
}

module.exports.InfosCircuit = function(request, response){
    response.title = 'Détail circuit';
    var num=request.params.numCircuit;
    async.parallel([
        function(callback){
            model.getInfosCircuits(num,function(err,result){
               callback(null,result);
            });},

        function(callback){
            model.getListeCircuits(function(err,result){  // UPDATE +s
               callback(null,result);
            });}

    ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.infosCircuits=result[0]; //UPDATE +s
            response.listeCircuits=result[1]; // UPDATE +s
            response.render('detailCircuit',response);
        }
    );//fin async
}

module.exports.menuCircuit = function(request, response){
    response.title = 'Menu des circuits';
    response.css="admin";
	model.getMenuCircuits(function(err,result){
		if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.menuCircuit = result;
        //console.log(result);
        response.render('menuCircuits', response);
	});
}

module.exports.AddCircuit = function(request, response){ // UPDATE rename de pageAjouterCircuit
    response.title = 'Ajouter un circuit';
    response.css="admin";
	model.getPays(function(err,result){
		if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listePays = result;
        //console.log(result);
        response.render('ajouterCircuit', response);
	});
}

module.exports.updateCircuit = function(request, response){ // UPDATE rename de pageModifier
    response.title = 'Modifier un circuit';
    response.css="admin";
    var num=request.params.numCircuit;

    async.parallel([
        function(callback){
            model.getInfosCircuit(num,function(err,result){
               callback(null,result);
            });
        }, //fin callback0

        function(callback){
            model.getPays(function(err,result){   // UPDATE remove All
               callback(null,result);
            });
        }, //fin callback1
    ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.infosCircuits=result[0][0];  // UPDATE
            response.listePays=result[1];
            response.render('modifierCircuit',response);
        }
    );//fin async
}
