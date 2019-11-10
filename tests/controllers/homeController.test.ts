import HomeController from '../../src/controllers/homeController';
import Home from '../../src/models/home';

test('Should be one more Home', async () => {
  //GIVEN
  const Homes: Home[] = await HomeController.displayHome();
  //WHEN
  const Homeo = new Home();
  Homeo.title='T1';
  Homeo.content='test';
  Homeo.media='no';
  await HomeController.addElementInHome(Homeo);
  const HomesWithAdd: Home[] = await HomeController.displayHome();
  //THEN
  expect(HomesWithAdd.length).toBe(Homes.length + 1);
});

test('Should be one less Hom', async () => {
  //GIVEN
  const Homes: Home[] = await HomeController.displayHome();
  const Home = await HomeController.getHomeByTitle('T1');
  //WHEN
  await HomeController.deleteElemInHome(Home.idHome.toString());
  //THEN
  const HomesWithAdd: Home[] = await HomeController.displayHome();
  expect(HomesWithAdd.length).toBe(Homes.length - 1);
});