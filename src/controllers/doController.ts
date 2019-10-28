const DoModel = require('../models/do');

export const displayDO= async (req: any, res: any) => {
  DoModel.findAll({
    order: [['idDo', 'ASC']]
  }).then((doElems: any) => {
    res.send(doElems); //Send the response
  });
};

export const deleteElemInDo = async (req: any, res: any) => {
  DoModel.destroy({
    where: {
      idDo: req.params.id
    }
  }).then((doElem: any) => {
    if(doElem == 1) {
      res.sendStatus(200);
    }else{
      res.sendStatus(404);
    }
    res.send(doElem);
  });
};