import Home from '../models/home';

function displayHome(): Promise<Home[]> {
  return Home.findAll({
    order: [['idHome', 'ASC']]
  });
}

function addElementInHome(elemHome: Home) {
  const elemToCreate = {
    title: elemHome.title,
    content: elemHome.content,
    media:elemHome.media
  };
  return Home.create(elemToCreate);
}

function updateElemInHome(elemHome: Home,id: string): Promise<[number, Home[]]> {
  const elemToUpdate = {
    title: elemHome.title,
    content: elemHome.content,
    media:elemHome.media
  };
  return Home.update(elemToUpdate, {
    where: {
      idHome: id
    }
  });
}

function deleteElemInHome(id: string): Promise<number> {
  return Home.destroy({
    where: {
      idHome: id
    }
  });
}

export = { displayHome, addElementInHome, updateElemInHome, deleteElemInHome };