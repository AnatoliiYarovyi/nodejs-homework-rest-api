const fs = require('fs/promises')

const contactsPath = require('./contactsPath')

const update = async contacts => {
  const contactsString = JSON.stringify(contacts)
  await fs.writeFile(contactsPath, contactsString)
}

module.exports = update
