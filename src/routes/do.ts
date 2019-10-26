const doRouter = require('express').Router();

//Get a text from the API and send it
doRouter.get('/', (req: any, res: any) => {
  res.type('application/json');
  res.status(200);
  res.json('DO section!');
});

module.exports = doRouter;