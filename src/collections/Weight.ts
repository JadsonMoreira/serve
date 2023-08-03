import mongoose from 'mongoose'

const weightSchema = new mongoose.Schema({
  value: { type: Number },
  type: { type: String },
})

const Weight = mongoose.model('weights', weightSchema)
export { Weight }
