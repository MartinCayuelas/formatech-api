const DoModel = require('../models/do');

export const displayDO= async (req: any, res: any) => {
  DoModel.findAll({
    order: [['idDo', 'ASC']]
  }).then((doElems: any) => {
    res.send(doElems); //Send the response
  });
};


