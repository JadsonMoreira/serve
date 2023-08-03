import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: { type: String },
  active: { type: Boolean },
})

const Category = mongoose.model('categories', categorySchema)
export { Category }
