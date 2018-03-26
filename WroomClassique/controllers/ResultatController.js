let model = require('../models/resultat.js');

  // //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerResultats = function(request, response){

	response.title = 'Liste des résulats des grands prix';
	model.getListePrix( function(err, result){
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
  		response.listeDesPrix = result;

	response.render('listerResultat', response);
});
}

module.exports.ResultatGrandPrix = function(request, response){
  var data = request.params.gpnum;
  response.title = 'Détails sur les résulats';

	model.getListePrix( function(err, result){
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
  		response.listeDesPrix = result;
});

	model.getPointsParPlace( function(err, result){
				if (err) {
						// gestion de l'erreur
						console.log(err);
						return;
				}
			response.listeDesPoints = result;
	});

    model.getResultatGP(data, function (err, result) {
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.resultatGP = result;
			response.render('detailsResultat', response);
  });
}
