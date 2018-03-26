let model = require('../models/ecurie.js');
var async=require('async');
// //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcuries = function(request, response){
    response.title = 'Liste des écuries';
    model.getListeEcuries(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcuries = result;
        response.render('listerEcurie', response);
    });
}

module.exports.InfoEcurie = function(request,response){
    response.title = 'Détail ecurie';
    var num = request.params.numEcurie;

    async.parallel([
            function(callback){
                model.getListeEcurie(function (err, result) {
                    callback(null,result);
                });
            }, //fin callback0

            function(callback){
                model.getInfosEcuries(num, function(err,result){
                    callback(null,result);
                });
            }, //fin callback1
            function(callback){
                model.getPiloteNumEcurie(num, function(err,result){
                    callback(null,result);
                });
            },
            function(callback){
                model.getVoitureNumEcurie(num, function(err,result){
                    callback(null,result);
                });
            },//fin callback3

        ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.listeEcuries= result[0];
            response.infosEcuries = result[1][0];
            response.infosPilotes = result[2];
            response.infosVoitures = result[3];
            response.render('detailEcurie',response);
        }
    );//fin async
}
