let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.GetLastResultat);
    app.get('/accueil', HomeController.GetLastResultat);

// pilotes
    app.get('/repertoirePilote', PiloteController.ListerLettres);
	app.get('/repertoirePilote/:lettreNom', PiloteController.ListerNoms);
    app.get('/repertoirePilote/detailPilote/:numPilote', PiloteController.InfosPilote);

 // circuits
   app.get('/circuits', CircuitController.ListerCircuits);
   app.get('/circuits/detailCircuit/:numCircuit', CircuitController.InfosCircuit);

// Ecuries
    app.get('/ecuries', EcurieController.ListerEcuries);
    app.get('/detailEcurie/:numEcurie', EcurieController.InfoEcurie);

 //Résultats
 app.get('/resultats', ResultatController.ListerResultats);
 app.get('/detailsResultat/:gpnum', ResultatController.ResultatGrandPrix);

// tout le reste
  app.get('*', HomeController.Index);
  app.post('*', HomeController.Index);

};
