const fs = require('fs/promises')
const { v4 } = require('uuid')

const listContacts = require('./listContacts')
const contactsPath = require('./contactsPath')

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    }
    const contacts = await listContacts()
    contacts.push(newContact)
    const updateContacts = await JSON.stringify(contacts)
    await fs.writeFile(contactsPath, updateContacts)
    console.table(contacts)
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = addContact
