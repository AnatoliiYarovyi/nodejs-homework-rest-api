const bcrypt = require('bcryptjs')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')

const { sendMail } = require('../../utils')
const { User } = require('../../models')

const avatarsDir = path.join(__dirname, '../../', 'public/avatars')

const singup = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }

  const verifyToken = v4()
  // --- отправка email для подтверждения регистрации -----
  const data = {
    to: email,
    subject: 'Регистрация на сайте',
    html: `<a href='http://localhost:3000/api/auth/users/verify/${verifyToken}'>Подтвердите регистрацию</a>`,
  }
  await sendMail(data)
  // ------------------------------------------------------

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const defaultAvatar = await gravatar.url(email, { s: '250' }, true)

  const result = await User.create({
    email,
    password: hashPassword,
    verifyToken,
    avatarURL: defaultAvatar,
  })

  // ---- создание папки с именем id пользователя----
  const dirPath = path.join(avatarsDir, `${result._id}`)
  await fs.mkdir(dirPath)
  // -------------------------------------------------
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Registration successful',
  })
  return result
}

module.exports = singup
