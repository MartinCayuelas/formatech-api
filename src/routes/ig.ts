const igRouter = require('express').Router();

//Get a text from the API and send it
igRouter.get('/', (req: any, res: any) => {
  res.type('application/json');
  res.status(200);
  res.json('IG section!');
});


//Get a text from the API and send it
igRouter.get('/presentation', (req: any, res: any) => {
  res.type('application/json');
  res.status(200);
  res.json('Présentation IG!');
});


module.exports = igRouter;