import mongoose from 'mongoose'

const couponSchema = new mongoose.Schema({
  active: { type: Boolean },
  value: { type: Number },
  code: { type: String },
  products: [{ type: mongoose.Types.ObjectId, ref: 'products' }],
  expirationDate: { type: Date },
})

const Coupon = mongoose.model('coupons', couponSchema)

export { Coupon }
