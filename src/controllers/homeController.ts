const HomeModel = require('../models/home');

export const displayHome = async (req: any, res: any) => {
  HomeModel.findAll({
    order: [['idHome', 'ASC']]
  }).then((homeElem: any) => {
    res.send(homeElem); //Send the response
  });
};



