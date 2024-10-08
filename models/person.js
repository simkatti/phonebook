const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name should be at least 3 characters'],
    required: true
  },
  number: {
    type: String,
    minlength: [8, 'Number is too short'],
    maxlength: [11, 'Number is too long'],
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d{5,7}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number! Number should be in form XX-XXXXX`
    },
    required: true
  } })

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
