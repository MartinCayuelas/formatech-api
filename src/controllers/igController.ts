import Ig from '../models/ig';

function displayIg(): Promise<Ig[]> {
  return Ig.findAll({
    order: [['idIg', 'ASC']]
  });
}

function addElementInIg(elemIg: Ig) {
  const elemToCreate = {
    title: elemIg.title,
    content: elemIg.content,
    media:elemIg.media
  };
  return Ig.create(elemToCreate);
}

function updateElemInIg(elemIg: Ig,id: string): Promise<[number, Ig[]]> {
  const elemToUpdate = {
    title: elemIg.title,
    content: elemIg.content,
    media:elemIg.media
  };
  return Ig.update(elemToUpdate, {
    where: {
      idIg: id
    }
  });
}

function deleteElemInIg(id: string): Promise<number> {
  return Ig.destroy({
    where: {
      idIg: id
    }
  });
}

export = { displayIg, addElementInIg, updateElemInIg, deleteElemInIg };