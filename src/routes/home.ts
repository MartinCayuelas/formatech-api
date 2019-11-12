import homeController from '../controllers/homeController';
import { Router, Request, Response } from 'express';
import checkJwt from '../middlewares/auth.middleware';
import Home from '../models/home';
const homeRouter = Router();

//Get  all ellements in Home from the API and send it
homeRouter.get('/', async (req: Request, res: Response) => {
  res.type('application/json');
  try {
    const homes: Home[] = await homeController.displayHome();
    res.status(200).json(homes);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

//Insert in the DB
homeRouter.post('/', [checkJwt], async (req: Request, res: Response) => {
  const elemhome: Home = new Home();
  elemhome.idHome = 0;
  elemhome.title = req.body.title;
  elemhome.content = req.body.content;
  elemhome.media = req.body.media;

  res.type('application/json');
  try {
    await homeController.addElementInHome(elemhome);
    res.sendStatus(201);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

//Update in the DB
homeRouter.put('/modifier/:id', [checkJwt], async (req: Request, res: Response) => {
  const elemhome: Home = new Home();
  elemhome.idHome = 0;
  elemhome.title = req.body.title;
  elemhome.content = req.body.content;
  elemhome.media = req.body.media;


  res.type('application/json');
  try {
    const homeElem: [number, Home[]] = await homeController.updateElemInHome(elemhome, req.params.id);
    if (homeElem[0] == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

//DELETE an elem with a given id
homeRouter.delete('/supprimer/:id', [checkJwt], async (req: Request, res: Response) => {
  res.type('application/json');
  try {
    const homeElem: number = await homeController.deleteElemInHome(req.params.id);
    if (homeElem == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

export default homeRouter;