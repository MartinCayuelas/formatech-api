import contactController from '../controllers/contactController';
import checkJwt from '../middlewares/auth.middleware';
import { Router, Request, Response } from 'express';
import Contact from '../models/contact';
const contactRouter = Router();

//Get a text from the API and send it
contactRouter.get('/', async (req: Request, res: Response) => {
  res.type('application/json');
  try {
    const contacts: Contact[] = await contactController.displayContacts();
    res.status(200).json(contacts);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

//Insert in the DB
contactRouter.post('/', [checkJwt], async (req: Request, res: Response) => {
  const elemContact: Contact = new Contact();
  elemContact.idContact = 0;
  elemContact.name = req.body.name;
  elemContact.email = req.body.email;
  elemContact.position = req.body.position;

  res.type('application/json');
  try {
    await contactController.addElementInContact(elemContact);
    res.sendStatus(201);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

//Update in the DB
contactRouter.put('/modifier/:id', [checkJwt], async (req: Request, res: Response) => {
  const elemContact: Contact = new Contact();
  elemContact.idContact = 0;
  elemContact.name = req.body.name;
  elemContact.email = req.body.email;
  elemContact.position = req.body.position;

  res.type('application/json');
  try {
    const contactElem: [number, Contact[]] = await contactController.updateElemInContact(elemContact, req.params.id);
    if (contactElem[0] == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

//DELETE an elem with a given id
contactRouter.delete('/supprimer/:id', [checkJwt], async (req: Request, res: Response) => {
  res.type('application/json');
  try {
    const contactElem: number = await contactController.deleteElemInContact(req.params.id);
    if (contactElem == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

export default contactRouter;