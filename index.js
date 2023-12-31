console.log("Server started");
const contacts = require("./contacts");

const argv = require('yargs').argv;

const  invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
          const allContacts = await contacts.listContacts();
          return console.log(allContacts);

    case 'get':
          const oneContact = await contacts.getContactById(id);
          return console.log(oneContact);

    case 'add':
          const newContact = await contacts.addContact({ name, email, phone });
          return console.log(newContact);

    case 'remove':
          const deleteById = await contacts.removeContact(id);
          return console.log(deleteById);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);