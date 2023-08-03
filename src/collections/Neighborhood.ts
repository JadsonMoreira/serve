import mongoose from 'mongoose'

const neighborhoodSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  Value: {
    type: String,
  },
})

const Neighborhood = mongoose.model('Neighborhood', neighborhoodSchema)
export { Neighborhood }
