const HomeModel = require('../models/home');

export const displayHome = async (req: any, res: any) => {
  HomeModel.findOne({
    where: {
      idHome: 1
    }
  }).then((home: any) => {
    res.json(home); //Send the response
  });
};



