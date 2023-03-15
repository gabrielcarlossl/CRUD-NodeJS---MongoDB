const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
  name: String,
  birthDate: Date,
  salary: Number,
  approved: Boolean,
})

module.exports = Person
