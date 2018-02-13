let model = require('../models/pilote.js');

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
  model.getListePilotesAvecLettre( function (err, result) {
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
     response.listePilotesParLettre = result;
     console.log(result);
     response.render('repertoirePilotes', response);
 }, lettre);
}
