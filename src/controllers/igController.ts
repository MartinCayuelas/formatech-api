import { Request, Response } from 'express';
import { Ig } from '../models/ig';

export const displayIG = async (req: Request, res: Response) => {
  Ig.findAll({
    order: [['idIg', 'ASC']]
  }).then((igElems: Ig[]) => {
    res.send(igElems); //Send the response
  });
};

export const addElementInIg = async (req: Request, res: Response) => {
  const datas = {
    title: req.body.title,
    content: req.body.content,
    media: req.body.media
  };

  Ig.create(datas)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

export const updateElemInIg = async (req: Request, res: Response) => {
  Ig.update({
    content: req.body.content,
    title: req.body.title,
    media: req.body.media
  }, {
    where: {
      idIg: req.params.id
    }
  }).then((igElem: [number, Ig[]]) => {
    if (igElem[0] == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};

export const deleteElemInIg = async (req: Request, res: Response) => {
  Ig.destroy({
    where: {
      idIg: req.params.id
    }
  }).then((igElem: number) => {
    if (igElem == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};
