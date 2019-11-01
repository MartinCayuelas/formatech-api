import { displayContacts, addElementInContact, updateElemInContact, deleteElemInContact } from '../controllers/contactController';
import { Router } from 'express';
const contactRouter = Router();

//Get a text from the API and send it
contactRouter.get('/', (req: any, res: any) => {
  displayContacts(req, res);
});

//Insert in the DB
contactRouter.post('/', (req: any, res: any) => {
  res.type('application/json');
  addElementInContact(req, res);
});

//Update in the DB
contactRouter.put('/modifier/:id', (req: any, res: any) => {
  res.type('application/json');
  updateElemInContact(req, res);
});


//DELETE an elem with a given id
contactRouter.delete('/supprimer/:id', (req: any, res: any) => {
  res.type('application/json');
  deleteElemInContact(req, res);
});

export default contactRouter;