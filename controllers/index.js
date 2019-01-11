const express = require('express')
const router = express()

const user = require('./users')

router.post(async (req, res, next) => {
  console.log(req)
  next()
})

router.use('/users', user)


module.exports = router