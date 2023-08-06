// const yargs = require("yargs");
// const {hideBin} = require("yargs/helpers");
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const contacts = require("./db/contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
			return console.log(allContacts);
    case 'get':
      const getContactById = await contacts.getContactById(id);
			return console.log(getContactById);
    case 'add':
      const newContact = await contacts.addContact({name, email, phone})
			return console.log(newContact);
    case 'remove':
      const deleteContact = await contacts.removeContact(id);
			return console.log(deleteContact);
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

// way 1
// const actionIndex = process.argv.indexOf("--action");

// if(actionIndex !== -1) {
// 	const action = process.argv[actionIndex +1];
// 	invokeAction({action})
// }
// console.log(process.argv)

// way 2
// const arr = hideBin(process.argv);
// const {argv} = yargs(arr);
// invokeAction(argv);