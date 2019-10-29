const IgModel = require('../models/ig');

export const displayIG = async (req: any, res: any) => {
  IgModel.findAll({
    order: [['idIg', 'ASC']]
  }).then((igElems: any) => {
    res.send(igElems); //Send the response
  });
};

export const addElementInIg = async (req: any, res: any) => {
  const datas = {
    title: req.body.title,
    content: req.body.content,
    media: req.body.media
  };

  IgModel.create(datas)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

export const updateElemInIg = async (req: any, res: any) => {
  IgModel.update({
    content: req.body.content,
    title: req.body.title,
    media: req.body.media
  }, {
    where: {
      idIg: req.params.id
    }
  }).then((igElem: any) => {
    if (igElem == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};

export const deleteElemInIg = async (req: any, res: any) => {
  IgModel.destroy({
    where: {
      idIg: req.params.id
    }
  }).then((igElem: any) => {
    if (igElem == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};
