import Do from '../models/do';

function displayDo(): Promise<Do[]> {
  return Do.findAll({
    order: [['idDo', 'ASC']]
  });
}

function addElementInDo(elemDo: Do) {
  const elemToCreate = {
    title: elemDo.title,
    content: elemDo.content,
    media:elemDo.media
  };
  return Do.create(elemToCreate);
}

function updateElemInDo(elemDo: Do,id: string): Promise<[number, Do[]]> {
  const elemToUpdate = {
    title: elemDo.title,
    content: elemDo.content,
    media:elemDo.media
  };
  return Do.update(elemToUpdate, {
    where: {
      idDo: id
    }
  });
}

function deleteElemInDo(id: string): Promise<number> {
  return Do.destroy({
    where: {
      idDo: id
    }
  });
}

export = { displayDo, addElementInDo, updateElemInDo, deleteElemInDo };