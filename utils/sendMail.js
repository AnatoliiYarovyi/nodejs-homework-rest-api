const nodemailer = require('nodemailer')
// const { InternalServerError } = require('http-errors')
require('dotenv').config()

const { EMAIL_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465, // 25, 465, 2255 нужно убедится в правильности
  secure: true,
  auth: {
    user: 'a.yarovyi@meta.ua',
    pass: EMAIL_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(nodemailerConfig)
/*
const email = {
  to: 'yarovoyanatolij@gmail.com',
  from: nodemailerConfig.auth.user,
  subject: 'Регистрация на сайте',
  html: '<p>Поздравляем с успешной регистрацией на нашем сайте</p>',
}
*/

const sendMail = async data => {
  try {
    const email = { ...data, from: nodemailerConfig.auth.user }
    await transporter.sendMail(email)
  } catch (error) {
    console.log(error)
    // throw new InternalServerError(error.message)
  }
}

module.exports = sendMail
