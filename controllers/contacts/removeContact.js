const contactsOperations = require('../../model/contacts')

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const remove = await contactsOperations.removeContact(contactId)
    if (!remove) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.json({ remove })
  } catch (error) {
    next(error)
  }
}

module.exports = removeContact
