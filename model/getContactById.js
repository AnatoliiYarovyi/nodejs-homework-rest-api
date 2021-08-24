const listContacts = require('./listContacts')

async function getContactById(contactId) {
  try {
    const contacts = await listContacts()
    const selectContact = contacts.find(({ id }) => id === contactId)
    if (!selectContact) {
      throw new Error(`Contact with id=${contactId} not found`)
    }
    return console.table(selectContact)
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = getContactById
