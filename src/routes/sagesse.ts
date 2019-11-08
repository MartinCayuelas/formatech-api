/*import { getSubjectDetails } from '../controllers/Subject';
import { getModuleDetails } from '../controllers/Module';
import { getSemesterDetails } from '../controllers/Semester';
import { getStepDetails } from '../controllers/Step';
import { getFormationDetails } from '../controllers/Formation';*/
import { testConnexion, getFormationDetails, getSubjectDetails, getModuleDetails, getPeriodDetails, getStepDetails } from '../controllers/sagesseController';

import { Router, Request, Response } from 'express';
const sagesseRouter = Router();


//send informations about a formation and the id of its year
sagesseRouter.get('/:formation/', (req: Request, res: Response) => {
  res.type('application/json');
  res.status(200);

  testConnexion()
  .then(() => {
    res.end('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });
/*
  getFormationDetails(req.params.formation)
  .then((formationDetails: Object) => {
    res.send(formationDetails);
  })
  .catch( (error : any) => {
    console.log(error);
  });*/
});



//send informations about a subjects
sagesseRouter.get('/subject/:id/', (req: Request, res: Response) => {
  res.type('application/json');
  res.status(200);
  getSubjectDetails(req, res);
});



//send informations about a module
sagesseRouter.get('/module/:id/', (req: Request, res: Response) => {
  res.type('application/json');
  res.status(200);
  getModuleDetails(req, res);
});



//send informations about a semester
sagesseRouter.get('/period/:id/', (req: Request, res: Response) => {
  res.type('application/json');
  res.status(200);
  getPeriodDetails(req, res);
});



//send informations about a year
sagesseRouter.get('/step/:id/', (req: Request, res: Response) => {
  res.type('application/json');
  res.status(200);
  getStepDetails(req, res);
});


export default sagesseRouter;
