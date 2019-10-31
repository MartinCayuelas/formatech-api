const ContactModel = require('../models/contact');

export const displayContacts = async (req: any, res: any) => {
  ContactModel.findAll({
    order: [['name', 'ASC']]
  }).then((contactElems: any) => {
    res.type('application/json');
    res.status(200);
    res.send(contactElems); //Send the response
  });
};

export const addElementInContact = async (req: any, res: any) => {
  const datas = {
    name: req.body.name,
    email: req.body.email,
    position: req.body.position
  };

  ContactModel.create(datas)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

export const updateElemInContact = async (req: any, res: any) => {
  ContactModel.update({
    name: req.body.name,
    email: req.body.email,
    position: req.body.position
  }, {
    where: {
      idContact: req.params.id
    }
  }).then((contactElem: any) => {
    if (contactElem == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};

export const deleteElemInContact = async (req: any, res: any) => {
  ContactModel.destroy({
    where: {
      idContact: req.params.id
    }
  }).then((contactElem: any) => {
    if (contactElem == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};