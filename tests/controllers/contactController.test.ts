import dotenv from 'dotenv';
dotenv.config();

import contactController from '../../src/controllers/contactController';
import Contact from '../../src/models/contact';

test('Should be one more contact', async () => {
  //GIVEN
  const contacts: Contact[] = await contactController.displayContacts();
  //WHEN
  const contact = new Contact();
  contact.email='mc@g.com';
  contact.name='test';
  contact.position='admin';
  await contactController.addElementInContact(contact);
  const contactsWithAdd: Contact[] = await contactController.displayContacts();
  //THEN
  expect(contactsWithAdd.length).toBe(contacts.length + 1);
});

test('Should be one less contact', async () => {
  //GIVEN
  const contacts: Contact[] = await contactController.displayContacts();
  const contact = await contactController.getContactByEmail('mc@g.com');
  //WHEN
  await contactController.deleteElemInContact(contact.idContact.toString());
  //THEN
  const contactsWithAdd: Contact[] = await contactController.displayContacts();
  expect(contactsWithAdd.length).toBe(contacts.length - 1);
});