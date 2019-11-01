import { Request, Response } from 'express';
import { Contact } from '../models/contact';



export const displayContacts = async (req: Request, res: Response) => {
  Contact.findAll({
    order: [['name', 'ASC']]
  }).then((contactElems: Contact[]) => {
    res.type('application/json');
    res.status(200);
    res.send(contactElems); //Send the response
  });
};

export const addElementInContact = async (req: Request, res: Response) => {
  const datas = {
    name: req.body.name,
    email: req.body.email,
    position: req.body.position
  };

  Contact.create(datas)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

export const updateElemInContact = async (req: Request, res: Response) => {
  Contact.update({
    name: req.body.name,
    email: req.body.email,
    position: req.body.position
  }, {
    where: {
      idContact: req.params.id
    }
  }).then((contactElem: [number, Contact[]]) => {
    if (contactElem[0] == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};

export const deleteElemInContact = async (req: Request, res: Response) => {
  Contact.destroy({
    where: {
      idContact: req.params.id
    }
  }).then((contactElem: number) => {
    if (contactElem == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};