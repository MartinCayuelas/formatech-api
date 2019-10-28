const IgModel = require('../models/ig');

export const displayIG = async (req: any, res: any) => {
  IgModel.findAll({
    order: [['idIg', 'ASC']]
  }).then((igElems: any) => {
    res.send(igElems); //Send the response
  });
};

export const deleteElemInIg = async (req: any, res: any) => {
  IgModel.destroy({
    where: {
      idIg: req.params.id
    }
  }).then((igElem: any) => {
    if(igElem == 1) {
      res.sendStatus(200);
    }else{
      res.sendStatus(404);
    }
    res.send(igElem);
  });
};