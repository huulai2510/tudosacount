const express = require('express')
const router = express()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/users')
const config = require('../config/configs')

router.post('/register', async (req, res, next) => {
  let {password, username, email} = req.body
  let jsonRes;
  let mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if (password > 5 && username.length > 5 && mailRegex.test(email.toLowerCase())) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt)
    let newUser = {
      username: username,
      password: hash,
      email: email
    }
    User.create(newUser)
    jsonRes = { httpCode: 200, message: "sign up successful"}
  } else {
    jsonRes = { httpCode: 400, message: "bad request"}
  }
  res.json(jsonRes)
})

router.post('/login', async (req, res, next) => {
  let {password, username, email} = req.body
  let data = await User.findOne({username: username})
  let compare = null
  if (data) {
    compare = bcrypt.compareSync(password, data.password)
  }
  let jsonRes;
  if (compare && data) {
    const access_token = jwt.sign({username, password}, config.accessTokenSecret ,{ expiresIn: config.tokenLife})
    const refresh_token = jwt.sign({username, password}, config.refreshTokenSecret ,{ expiresIn: config.refreshTokenLife})
    jsonRes = {
      httpCode: 200,
      message: "logged in",
      access_token,
      refresh_token
    }
  } else {
    jsonRes = {
      httpCode: 401,
      message: "log fail"
    }
  }
  res.json(jsonRes)
})

module.exports = router