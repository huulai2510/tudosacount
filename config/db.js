const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGOFB_URI || 'mongodb://localhost:27017/todos', {
  useNewUrlParser: true
})

module.exports = mongoose