const HomeModel = require('../models/home');

export const displayHome = async (req: any, res: any) => {
  HomeModel.findAll({
    order: [['idHome', 'ASC']]
  }).then((homeElem: any) => {
    res.send(homeElem); //Send the response
  });
};

export const updateElemInHome = async (req: any, res: any) => {
  HomeModel.update({
    content: req.body.params.content,
    title: req.body.params.title,
    media: req.body.params.media
  }, {
    where: {
      idHome: req.params.id
    }
  }).then((homeElem: any) => {
    res.send(homeElem);
  });
};

export const deleteElemInHome = async (req: any, res: any) => {
  HomeModel.destroy({
    where: {
      idHome: req.params.id
    }
  }).then((homeElem: any) => {
    if(homeElem == 1) {
      res.sendStatus(200);
    }else{
      res.sendStatus(404);
    }
    res.send(homeElem);
  });
};


