const listContacts = require('./listContacts')
const update = require('./update')

async function removeContact(contactId) {
  try {
    const contacts = await listContacts()
    const idx = contacts.findIndex(({ id }) => id == contactId)
    if (idx === -1) {
      return null
    }
    const newContacts = contacts.filter(({ id }) => id != contactId)
    await update(newContacts)
    return newContacts
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = removeContact
