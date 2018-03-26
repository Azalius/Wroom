let model = require('../models/accueil.js');

  // ////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";
    response.render('home', response);
};

module.exports.GetLastResultat = function(request, response){
    response.title = 'Dernier Resultat';
    model.getLastRes( function(err, result){
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
  		response.lastRes = result;
    });

    model.getLastUpd( function(err, result){
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
  		response.lastUpd = result;
    	response.render('home', response);
    });
}
