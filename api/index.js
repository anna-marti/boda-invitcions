const router    = require('express').Router();
const Invitacio = require('../models/invitacio');

module.exports = () => {
  router.put('/invitacio', (req, res, next) => {
    let inv = req.body.invitacio;

    Invitacio.findById(inv.id, function(err, invitacio) {

      if (err)
        res.status(404).json({status: 'not found'});

      invitacio.vindra  = inv.vindra;
      invitacio.parella = inv.parella;
      invitacio.nens    = inv.nens;

      invitacio.save(function(err) {
        if (err)
          return res.status(404).json({status: 'failed'});

        res.json({ status: 'updated' });
      });

    });
  });

  router.get('/import', (req, res, next) => {
    const dades = require('../dades.json');
    let processed = [];
    console.log(dades);
    dades.forEach(item => {
      console.log('Processant ', item.Name);
      let invitacio = new Invitacio();
      invitacio.nom = item.Name;
      invitacio.cognoms = item.surname;
      invitacio.mail = item.email;
      invitacio.vindra = null;
      invitacio.parella = null;
      invitacio.nens = null;

      invitacio.save(function(err) {
        if (err)
          return console.log('Save failed for ', invitacio);

        processed.push(invitacio);
      });
    });

    res.json({ processed: processed });
  });

  router.get('/llista', (req, res, next) => {
    Invitacio.find(function(err, invitacions) {
      if (err)
        return res.status(500).send(err);

      var total = invitacions.reduce((previous, current) => {
        return previous + current.parella;
      }, 0);

      var nens = invitacions.reduce((previous, current) => {
        return previous + (current.nens ? 1 : 0);
      }, 0);

      var visites = invitacions.reduce((previous, current) => {
        return previous + (current.visitat ? 1 : 0);
      }, 0);

      res.json({
        total,
        nens,
        visites,
        invitacions
      });
    });
  })

  return router;
};
