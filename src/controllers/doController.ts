import { Request, Response } from 'express';
import { Do } from '../models/do';

export const displayDO = async (req: Request, res: Response) => {
  Do.findAll({
    order: [['idDo', 'ASC']]
  }).then((doElems: Do[]) => {
    res.type('application/json');
    res.status(200);
    res.send(doElems); //Send the response
  });
};

export const addElementInDO = async (req: Request, res: Response) => {
  const datas = {
    title: req.body.title,
    content: req.body.content,
    media: req.body.media
  };

  Do.create(datas)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

export const updateElemInDO = async (req: Request, res: Response) => {
  Do.update({
    content: req.body.content,
    title: req.body.title,
    media: req.body.media
  }, {
    where: {
      idDo: req.params.id
    }
  }).then((doElem: [number, Do[]]) => {
    if (doElem[0] == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};

export const deleteElemInDO = async (req: Request, res: Response) => {
  Do.destroy({
    where: {
      idDo: req.params.id
    }
  }).then((doElem: number) => {
    if (doElem == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};
