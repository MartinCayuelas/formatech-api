import { getSubjectDetails, getModuleDetails, getSemesterDetails, getYearDetails, getFormationDetails } from '../controllers/sagesseController';
import { Router, Request, Response } from 'express';
const sagesseRouter = Router();


//send informations about a formation and the id of its year
sagesseRouter.get('/:formation/', (req: Request, res: Response) => {
  res.type('application/json');
  res.status(200);
  if(req.params.formation=='DO'){
    getFormationDetails(req.params.formation, '2020', res);
  }
  else {
    getFormationDetails(req.params.formation, '2018', res);
  }
});



//send informations about a subjects
sagesseRouter.get('/:formation/subject/:id/', (req: Request, res: Response) => {
  res.type('application/json');
  res.status(200);
  if(req.params.formation=='DO'){
    getSubjectDetails(req.params.id, '2020', res);
  }
  else {
    getSubjectDetails(req.params.id, '2018', res);
  }
});



//send informations about a module
sagesseRouter.get('/:formation/module/:id/', (req: Request, res: Response) => {
  res.type('application/json');
  res.status(200);
  if(req.params.formation=='DO'){
    getModuleDetails(req.params.id, '2020', res);
  }
  else {
    getModuleDetails(req.params.id, '2018', res);
  }
});



//send informations about a semester
sagesseRouter.get('/:formation/semester/:id/', (req: Request, res: Response) => {
  res.type('application/json');
  res.status(200);
  if(req.params.formation=='DO'){
    getSemesterDetails(req.params.id, '2020', res);
  }
  else {
    getSemesterDetails(req.params.id, '2018', res);
  }
});



//send informations about a year
sagesseRouter.get('/:formation/year/:id/', (req: Request, res: Response) => {
  res.type('application/json');
  res.status(200);
  if(req.params.formation=='DO'){
    getYearDetails(req.params.id, '2020', res);
  }
  else {
    getYearDetails(req.params.id, '2018', res);
  }
});


export default sagesseRouter;
