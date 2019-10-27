const homeRouter = require('express').Router();
var cors = require('cors');

//Get a text from the API and send it
homeRouter.get('/', cors(), (req: any, res: any) => {
  res.type('application/json');
  res.status(200);
  res.json('Accueil depuis le back!');
});

module.exports = homeRouter;