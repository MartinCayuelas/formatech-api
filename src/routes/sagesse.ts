/*import { getSubjectDetails } from '../controllers/Subject';
import { getModuleDetails } from '../controllers/Module';
import { getSemesterDetails } from '../controllers/Semester';
import { getStepDetails } from '../controllers/Step';
import { getFormationDetails } from '../controllers/Formation';*/
import {
  getModuleFromStep,
  getFormationDetails,
  getSubjectDetails,
  getModuleDetails,
  getPeriodDetails,
  getStepDetails,
  getSubjectsByTeacher
} from '../controllers/sagesseController';

import { Router, Request, Response } from 'express';
const sagesseRouter = Router();


//send informations about a formation and the id of its year
sagesseRouter.get('/:formation/', (req: Request, res: Response) => {

  /*  testConnexion()
  .then(() => {
    res.end('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });
  */
  getFormationDetails(req.params.formation)
    .then((formationDetails: Object) => {
      res.type('application/json');
      res.status(200);
      res.send(formationDetails);
    })
    .catch( (error : any) => {
      res.type('text/html');
      res.status(404);
      res.send('<h2>'+error+'</h2>');
    });
});



//send informations about a subjects
sagesseRouter.get('/subject/:id/', (req: Request, res: Response) => {

  getSubjectDetails(parseInt(req.params.id))
    .then((subjectDetails: Object) => {
      res.type('application/json');
      res.status(200);
      res.send(subjectDetails);
    })
    .catch( (error : any) => {
      res.type('text/html');
      res.status(404);
      res.send('<h2>'+error+'</h2>');
    });
});



//send informations about a module
sagesseRouter.get('/module/:id/', (req: Request, res: Response) => {

  getModuleDetails(parseInt(req.params.id))
    .then((moduleDetails: Object) => {
      res.type('application/json');
      res.status(200);
      res.send(moduleDetails);
    })
    .catch((error : any) => {
      res.type('text/html');
      res.status(404);
      res.send('<h2>'+error+'</h2>');
    });
});



//send informations about a semester
sagesseRouter.get('/period/:id/', (req: Request, res: Response) => {

  getPeriodDetails(parseInt(req.params.id))
    .then((periodDetails: Object) => {
      res.type('application/json');
      res.status(200);
      res.send(periodDetails);
    })
    .catch( (error : any) => {
      res.type('text/html');
      res.status(404);
      res.send('<h2>'+error+'</h2>');
    });
});



//send informations about a year
sagesseRouter.get('/step/:id/', (req: Request, res: Response) => {

  getStepDetails(parseInt(req.params.id))
    .then((stepDetails: Object) => {
      res.type('application/json');
      res.status(200);
      res.send(stepDetails);
    })
    .catch( (error : any) => {
      res.type('text/html');
      res.status(404);
      res.send('<h2>'+error+'</h2>');
    });
});


//send informations about a year
sagesseRouter.get('/step/:id/modules', (req: Request, res: Response) => {

  getModuleFromStep(parseInt(req.params.id))
    .then((modulesFromStep: Object) => {
      res.type('application/json');
      res.status(200);
      res.send(modulesFromStep);
    })
    .catch( (error : any) => {
      res.type('text/html');
      res.status(404);
      res.send('<h2>'+error+'</h2>');
    });
});

sagesseRouter.get('/teacher/:firstname/:lastname', (req: Request, res: Response) => {

  getSubjectsByTeacher(req.params.firstname, req.params.lastname)
    .then((resultList: Object) => {
      res.type('application/json');
      res.status(200);
      res.send(resultList);
    })
    .catch( (error: any) => {
      res.type('text/html');
      res.status(404);
      res.send('<h2>'+error+'</h2>');
    });
});



export default sagesseRouter;
