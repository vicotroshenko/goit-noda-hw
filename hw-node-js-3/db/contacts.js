const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts); // 
};

const getContactById = async (contactId) => {
  const idToString = String(contactId);
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === idToString);
  return contact || null;
};

const removeContact = async (contactId) => {
  const idToString = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === idToString);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (newContact) => {
  const contacts = await listContacts();
  const contact = {
    id: nanoid(),
    ...newContact,
  };
  contacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
};

const updateById = async (id, data) => {
  const idToString = String(id);
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === idToString);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
