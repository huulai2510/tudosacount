const db = require('../config/db')
const bcrypt = require('bcryptjs')

const Schema = db.Schema

const User = new Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
})

module.exports = db.model('users', User)