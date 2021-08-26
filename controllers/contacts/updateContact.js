const contactsOperations = require('../../model/contacts')
const { contactSchema } = require('../../validation')

const updateContact = async (req, res, next) => {
  try {
    const { error } = await contactSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: 'missing required name field' })
    }
    const { contactId } = req.params
    const contact = await contactsOperations.updateContact(contactId, req.body)
    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.status(201).json({ contact })
  } catch (error) {
    next(error)
  }
}

module.exports = updateContact
