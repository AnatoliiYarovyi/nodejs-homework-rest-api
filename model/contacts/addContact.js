const { v4 } = require('uuid')

const listContacts = require('./listContacts')
const update = require('./update')

async function addContact(data) {
  try {
    const newContact = {
      id: v4(),
      ...data,
    }
    const contacts = await listContacts()
    contacts.push(newContact)
    await update(contacts)
    return newContact
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = addContact
