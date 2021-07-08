import Contact from '../models/contact';

function displayContacts(): Promise<Contact[]> {
  return Contact.findAll({
    order: [['name', 'ASC']]
  });
}

function addElementInContact(elemContact: Contact) {
  const elemToCreate = {
    name: elemContact.name,
    email: elemContact.email,
    position: elemContact.position
  };
  return Contact.create(elemToCreate);
}

function updateElemInContact(elemContact: Contact, id: string): Promise<[number, Contact[]]> {
  const elemToUpdate = {
    name: elemContact.name,
    email: elemContact.email,
    position: elemContact.position
  };
  return Contact.update(elemToUpdate, {
    where: {
      idContact: id
    }
  });
}

function deleteElemInContact(id: string): Promise<number> {
  return Contact.destroy({
    where: {
      idContact: id
    }
  });
}

function getContactByEmail(emailToCheck: string): Promise<Contact> {
  return Contact.findOne({
    where: {
      email: emailToCheck
    }
  });
}

export = { displayContacts, addElementInContact, updateElemInContact, deleteElemInContact, getContactByEmail };