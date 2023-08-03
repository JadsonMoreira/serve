import mongoose from 'mongoose'
import { paymentFormEnum } from '../enum/PaymentFormEnum'

const orderSchema = new mongoose.Schema({
  products: [
    {
      id: { type: mongoose.Types.ObjectId, ref: 'products' },
      quantity: { type: Number },
      observation: { type: String },
    },
  ],
  status: { type: String },
  date: { type: Date },
  paymentForm: { type: String, enum: [paymentFormEnum] },
  moneyChange: { type: Number },
  discount: {
    id: { type: mongoose.Types.ObjectId, ref: 'coupons' },
    type: { type: String },
    value: { type: Number },
  },
  number: { type: Number },

  user: {
    name: { type: String },
    phone: { type: String },
    cpf: { type: String },
  },
  withdrawalEstablishment: { type: Boolean },
  delivery: { type: Boolean },
  totalPartial: { type: Number },
  total: { type: Number },
  totalFreight: { type: Number },
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

const Order = mongoose.model('orders', orderSchema)
export { Order }
