import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  cpf: { type: String },
  address: {
    neighborhood: { type: String },
    zipCode: { type: String },
    publicPlace: { type: String },
    city: { type: String },
    state: { type: String },
    complement: { type: String },
    number: { type: String },
  },
})

const User = mongoose.model('users', userSchema)

export { User }
