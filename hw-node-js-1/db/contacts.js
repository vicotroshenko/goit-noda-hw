const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts); // ...твій код. Повертає масив контактів.
};

const getContactById = async (contactId) => {
	const idToString = String(contactId);
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === idToString);
  return contact || null;
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
};

const removeContact = async (contactId) => {
	const idToString = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === idToString);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
};

const addContact = async (newContact) => {
  const contacts = await listContacts();
  const contact = {
    id: nanoid(),
 		...newContact
  };
  contacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
  // ...твій код. Повертає об'єкт доданого контакту.
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
