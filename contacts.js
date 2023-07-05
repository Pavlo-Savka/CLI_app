const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const BASE_PATH = __dirname;
const dbFile = "db/contacts.json";
const contactsPath = path.join(BASE_PATH, dbFile);

const fileOperationRead = async () => {
    const data = await fs.readFile(contactsPath, "UTF-8");
    console.log(data);
}
const fileOperationAppend = async (text) => {
    const data = await fs.appendFile(contactsPath, text, "UTF-8");
    console.log(data);
}
const fileOperationWrite = async (text) => {
    const data = await fs.writeFile(contactsPath, text, "UTF-8");
    console.log(data);
}

const listContacts = async() => {
    const allContacts = await fs.readFile(contactsPath, "UTF-8");
    return JSON.parse(allContacts);
}

const getContactById = async (contactId) => {
    contactId = String(contactId);
    const allContacts = await listContacts();
    if (Array.isArray(allContacts)) {
        
        const oneContact = allContacts.find(item => item.id === contactId);
        return oneContact || null;
    }
}

const removeContact = async (contactId) => {
    const allContacts = await listContacts();
    console.log(typeof(allContacts));
    contactId = String(contactId);
    const index = allContacts.findIndex(item => item.id === contactId);
    if (index === -1) { return null };
    const [result] = allContacts.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return result;
}

const addContact = async (data) => {   //name, email, phone
    const allContacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    };
    allContacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact; 
}

module.exports = {fileOperationRead, fileOperationAppend, fileOperationWrite, listContacts, getContactById, removeContact, addContact
};