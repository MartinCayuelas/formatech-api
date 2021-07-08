import DoController from '../../src/controllers/doController';
import Do from '../../src/models/do';

test('Should be one more Do', async () => {
  //GIVEN
  const Dos: Do[] = await DoController.displayDo();
  //WHEN
  const doo = new Do();
  doo.title='T1';
  doo.content='test';
  doo.media='no';
  await DoController.addElementInDo(doo);
  const DosWithAdd: Do[] = await DoController.displayDo();
  //THEN
  expect(DosWithAdd.length).toBe(Dos.length + 1);
});

test('Should be one less Do', async () => {
  //GIVEN
  const Dos: Do[] = await DoController.displayDo();
  const Do = await DoController.getDoByTitle('T1');
  //WHEN
  await DoController.deleteElemInDo(Do.idDo.toString());
  //THEN
  const DosWithAdd: Do[] = await DoController.displayDo();
  expect(DosWithAdd.length).toBe(Dos.length - 1);
});