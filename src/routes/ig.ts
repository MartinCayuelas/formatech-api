import igController from '../controllers/igController';
import { Router, Request, Response } from 'express';
import checkJwt from '../middlewares/auth.middleware';
import Ig from '../models/ig';
const igRouter = Router();

//Get a text from the API and send it
igRouter.get('/', async (req: Request, res: Response) => {
  res.type('application/json');
  try {
    const igs: Ig[] = await igController.displayIg();
    res.status(200).json(igs);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

//Insert in the DB
igRouter.post('/', [checkJwt], async (req: Request, res: Response) => {
  const elemig: Ig = new Ig();
  elemig.idIg = 0;
  elemig.title = req.body.title;
  elemig.content = req.body.content;
  elemig.media = req.body.media;

  res.type('application/json');
  try {
    await igController.addElementInIg(elemig);
    res.sendStatus(201);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

//Update in the DB
igRouter.put('/modifier/:id', [checkJwt], async (req: Request, res: Response) => {
  const elemig: Ig = new Ig();
  elemig.idIg = 0;
  elemig.title = req.body.title;
  elemig.content = req.body.content;
  elemig.media = req.body.media;


  res.type('application/json');
  try {
    const igElem: [number, Ig[]] = await igController.updateElemInIg(elemig, req.params.id);
    if (igElem[0] == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

//DELETE an elem with a given id
igRouter.delete('/supprimer/:id', [checkJwt], async (req: Request, res: Response) => {
  res.type('application/json');
  try {
    const igElem: number = await igController.deleteElemInIg(req.params.id);
    if (igElem == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

export default igRouter;