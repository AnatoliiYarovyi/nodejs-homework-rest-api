const update = require('./update')
const listContacts = require('./listContacts')

const updateContact = async (id, updateInfo) => {
  try {
    const contacts = await listContacts()
    const idx = contacts.findIndex(item => item.id === id)
    if (idx === -1) {
      return null
    }
    contacts[idx] = { ...contacts[idx], ...updateInfo }
    await update(contacts)
    return contacts[idx]
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = updateContact
