const DoModel = require('../models/do');

export const displayDO = async (req: any, res: any) => {
  DoModel.findAll({
    order: [['idDo', 'ASC']]
  }).then((doElems: any) => {
    res.type('application/json');
    res.status(200);
    res.send(doElems); //Send the response
  });
};

export const addElementInDO = async (req: any, res: any) => {
  const datas = {
    title: req.body.title,
    content: req.body.content,
    media: req.body.media
  };

  DoModel.create(datas)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

export const updateElemInDO = async (req: any, res: any) => {
  DoModel.update({
    content: req.body.content,
    title: req.body.title,
    media: req.body.media
  }, {
    where: {
      idDo: req.params.id
    }
  }).then((doElem: any) => {
    if (doElem == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};

export const deleteElemInDO = async (req: any, res: any) => {
  DoModel.destroy({
    where: {
      idDo: req.params.id
    }
  }).then((doElem: any) => {
    if (doElem == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};
