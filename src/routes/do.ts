const doRouter = require('express').Router();

//Get a text from the API and send it
doRouter.get('/', (req: any, res: any) => {
  res.type('application/json');
  res.status(200);
  res.json('DO section!');
});


//Get a text from the API and send it
doRouter.get('/presentation', (req: any, res: any) => {
  res.type('application/json');
  res.status(200);
  res.json('Présentation DO!');
});




module.exports = doRouter;