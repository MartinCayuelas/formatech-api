import { displayContacts, addElementInContact, updateElemInContact, deleteElemInContact } from '../controllers/contactController';
import  checkJwt  from '../middlewares/auth.middleware';
import { Router, Request, Response } from 'express';
const contactRouter = Router();

//Get a text from the API and send it
contactRouter.get('/', (req: Request, res: Response) => {
  displayContacts(req, res);
});

//Insert in the DB
contactRouter.post('/', [checkJwt], (req: Request, res: Response) => {
  res.type('application/json');
  addElementInContact(req, res);
});

//Update in the DB
contactRouter.put('/modifier/:id', [checkJwt], (req: Request, res: Response) => {
  res.type('application/json');
  updateElemInContact(req, res);
});


//DELETE an elem with a given id
contactRouter.delete('/supprimer/:id', [checkJwt], (req: Request, res: Response) => {
  res.type('application/json');
  deleteElemInContact(req, res);
});

export default contactRouter;