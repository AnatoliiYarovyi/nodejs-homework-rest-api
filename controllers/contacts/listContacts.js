const { Contact } = require('../../models')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({})
    res.json({ contacts })
  } catch (error) {
    next(error)
  }
}

module.exports = listContacts
