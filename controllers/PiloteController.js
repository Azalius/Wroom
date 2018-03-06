let model = require('../models/pilote.js');
var async = require('async');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des pilotes';
   model.getListePilotes( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
      response.listePilotes = result;
      response.render('repertoirePilotes', response);
  });
}
module.exports.ListePilotesParLettre = function(request, response){
  var lettre = request.params.lettre;
  response.title = 'Répertoire des pilotes';
  async.parallel([
    function(callback){
      model.getListePilotesAvecLettre( function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        callback(null, result);
       },lettre);

     },
     function(callback){
       model.getListePilotes( function (err, result) {
           if (err) {
               // gestion de l'erreur
               console.log(err);
               return;
           }
           callback(null, result);
      })
    }
  ],
   function(err,result){
     if(err){
       console.log(err);
       return;
     }
     response.listePilotesParLettre = result[0];
     response.listePilotes = result[1];
     response.render('repertoirePilotes', response);
  });
}
