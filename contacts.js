const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');
 
async function listContacts() {
    try {
      const data = await fs.readFile(contactsPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading contacts:', error);
      return [];
    }
  }
  
  async function getContactById(contactId) {
    try {
      const data = await fs.readFile(contactsPath, 'utf-8');
      const contacts = JSON.parse(data);
      return contacts. find(contact => contact.id === contactId) || null;
   } catch (error) {
    console.error('Error getting contact by id:', error);
    return null;
   }
  }
  
  async function removeContact(contactId) {
    try {
      const data = await fs.readFile(contactsPath, 'utf-8');
      let contacts = JSON.parse(data);
  
      const index = contacts.findIndex(contact => contact.id === contactId);
      if (index !== -1) {
        const removedContact = contacts.splice(index, 1)[0];
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return removedContact; 
      } else {
        return null;
      }
    } catch(error) {
      console.error('Error removing contact', error);
      return null;
    }
  }
  
 async function addContact(name, email, phone) {
    try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    let contacts = JSON.parse(data);
    const newContact = { id:Date.now(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
   } catch (error) {
    console.error(' Error adding contact:', error);
    return null;
   }
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  };