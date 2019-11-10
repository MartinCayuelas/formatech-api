import IgController from '../../src/controllers/igController';
import Ig from '../../src/models/ig';

test('Should be one more Ig', async () => {
  //GIVEN
  const Igs: Ig[] = await IgController.displayIg();
  //WHEN
  const ig = new Ig();
  ig.title='T1';
  ig.content='test';
  ig.media='no';
  await IgController.addElementInIg(ig);
  const IgsWithAdd: Ig[] = await IgController.displayIg();
  //THEN
  expect(IgsWithAdd.length).toBe(Igs.length + 1);
});

test('Should be one less Ig', async () => {
  //GIVEN
  const Igs: Ig[] = await IgController.displayIg();
  const Ig = await IgController.getIgByTitle('T1');
  //WHEN
  await IgController.deleteElemInIg(Ig.idIg.toString());
  //THEN
  const IgsWithAdd: Ig[] = await IgController.displayIg();
  expect(IgsWithAdd.length).toBe(Igs.length - 1);
});