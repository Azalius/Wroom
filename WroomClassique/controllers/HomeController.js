let model = require('../models/accueil.js');

  // ////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";
    response.render('home', response);
};

module.exports.GetDernierResultat = function(request, response){
    response.title = 'Dernier Resultat';
    model.getDernierResultat( function(err, result){
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
  		response.dernierresultat = result;
    });

    model.getDerniereMaj( function(err, result){
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
  		response.dernieremaj = result;
    	response.render('home', response);
    });
}
