import doController from '../controllers/doController';
import { Router, Request, Response } from 'express';
import checkJwt from '../middlewares/auth.middleware';
import Do from '../models/do';
import logger from '../helpers/logger';
const doRouter = Router();

//Get  all ellements in Do from the API and send it
doRouter.get('/', async (req: Request, res: Response) => {
  res.type('application/json');
  try {
    const dos: Do[] = await doController.displayDo();
    res.status(200).json(dos);
    logger.info('Getting Do elements OK');
  } catch (e) {
    res.status(500).json(e.message);
  }
});

//Insert in the DB
doRouter.post('/', [checkJwt], async (req: Request, res: Response) => {
  const elemdo: Do = new Do();
  elemdo.idDo = 0;
  elemdo.title = req.body.title;
  elemdo.content = req.body.content;
  elemdo.media = req.body.media;

  res.type('application/json');
  try {
    await doController.addElementInDo(elemdo);
    logger.info(`Do element created with title ${elemdo.title}`);
    res.sendStatus(201);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

//Update in the DB
doRouter.put('/modifier/:id', [checkJwt], async (req: Request, res: Response) => {
  const elemdo: Do = new Do();
  elemdo.idDo = 0;
  elemdo.title = req.body.title;
  elemdo.content = req.body.content;
  elemdo.media = req.body.media;


  res.type('application/json');
  try {
    const doElem: [number, Do[]] = await doController.updateElemInDo(elemdo, req.params.id);
    if (doElem[0] == 1) {
      res.sendStatus(200);
    } else {
      logger.error(`Do with id : ${req.params.id} doesn't exists when asking for update`);
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

//DELETE an elem with a given id
doRouter.delete('/supprimer/:id', [checkJwt], async (req: Request, res: Response) => {
  res.type('application/json');
  try {
    const doElem: number = await doController.deleteElemInDo(req.params.id);
    if (doElem == 1) {
      res.sendStatus(200);
    } else {
      logger.error(`Do with id : ${req.params.id} doesn't exists when asking for delete`);
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

export default doRouter;