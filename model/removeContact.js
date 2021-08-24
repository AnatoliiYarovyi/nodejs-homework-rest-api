const fs = require('fs/promises')
const contactsPath = require('./contactsPath')
const listContacts = require('./listContacts')

async function removeContact(contactId) {
  try {
    const contacts = await listContacts()
    const idx = contacts.findIndex(({ id }) => id === contactId)
    if (idx === -1) {
      throw new Error(`Contact with id=${contactId} not found`)
    }
    const newContacts = contacts.filter(({ id }) => id !== contactId)
    const updateContacts = await JSON.stringify(newContacts)
    await fs.writeFile(contactsPath, updateContacts)
    console.table(newContacts)
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = removeContact
