const homeRouter = require('express').Router();


//Get a text from the API and send it
homeRouter.get('/', (req: any, res: any) => {
  res.type('application/json');
  res.status(200);
  res.json('Accueil depuis le back!');
});



module.exports = homeRouter;