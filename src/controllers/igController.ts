const IgModel = require('../models/ig');

export const displayIG = async (req: any, res: any) => {
  IgModel.findAll({
    order: [['idIg', 'ASC']]
  }).then((igElems: any) => {
    res.send(igElems); //Send the response
  });
};



