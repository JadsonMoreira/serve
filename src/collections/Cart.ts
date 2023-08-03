import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  paymentForm: { type: String },
  moneyChange: { type: Number },
  orders: [
    {
      id: { type: mongoose.Types.ObjectId, ref: 'orders' },
      quantity: { type: Number },
    },
  ],
  user: { type: mongoose.Types.ObjectId, ref: 'users' },
  date: { type: Date },
  status: { type: String },
  coupon: { type: mongoose.Types.ObjectId, ref: 'coupons' },
  withdrawalEstablishment: { type: Boolean },
  delivery: { type: Boolean },
})

const Cart = mongoose.model('carts', cartSchema)

export { Cart }
