import { Request, Response } from 'express';
import Home from '../models/home';

const displayHome = async (req: Request, res: Response) => {
  Home.findAll({
    order: [['idHome', 'ASC']]
  }).then((homeElem: Home[]) => {
    res.type('application/json');
    res.status(200);
    res.send(homeElem); //Send the response
  });
};

const addElementInHome = async (req: Request, res: Response) => {
  const datas = {
    title: req.body.title,
    content: req.body.content,
    media: req.body.media
  };

  Home.create(datas)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

const updateElemInHome = async (req: Request, res: Response) => {
  Home.update({
    content: req.body.content,
    title: req.body.title,
    media: req.body.media
  }, {
    where: {
      idHome: req.params.id
    }
  }).then((homeElem: [number, Home[]]) => {
    if (homeElem[0] == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};

const deleteElemInHome = async (req: Request, res: Response) => {
  Home.destroy({
    where: {
      idHome: req.params.id
    }
  }).then((homeElem: number) => {
    if (homeElem == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};

export { displayHome, addElementInHome, updateElemInHome, deleteElemInHome };