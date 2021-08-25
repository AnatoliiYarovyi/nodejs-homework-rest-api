const express = require('express')
const router = express.Router()

const contactsOperations = require('../../model')
const { contactSchema } = require('../../validation')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({ contacts })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await contactsOperations.getContactById(contactId)
    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.json({ contact })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = await contactSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: 'missing required name field' })
    }
    const contacts = await contactsOperations.addContact(req.body)
    res.status(201).json({ contacts })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
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
})

router.put('/:contactId', async (req, res, next) => {
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
})

module.exports = router
