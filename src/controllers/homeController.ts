const HomeModel = require('../models/home');

export const displayHome = async (req: any, res: any) => {
  HomeModel.findAll({
    order: [['idHome', 'ASC']]
  }).then((homeElem: any) => {
    res.type('application/json');
    res.status(200);
    res.send(homeElem); //Send the response
  });
};

export const addElementInHome = async (req: any, res: any) => {
  const datas = {
    title: req.body.title,
    content: req.body.content,
    media: req.body.media
  };

  HomeModel.create(datas)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

export const updateElemInHome = async (req: any, res: any) => {
  HomeModel.update({
    content: req.body.content,
    title: req.body.title,
    media: req.body.media
  }, {
    where: {
      idHome: req.params.id
    }
  }).then((homeElem: any) => {
    if (homeElem == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};

export const deleteElemInHome = async (req: any, res: any) => {
  HomeModel.destroy({
    where: {
      idHome: req.params.id
    }
  }).then((homeElem: any) => {
    if (homeElem == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};


