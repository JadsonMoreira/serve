import mongoose from 'mongoose'
import { Dish as IProduct } from '../interfaces/Dish'

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String },
  title: { type: String },
  description: { type: String },
  foto: { type: String },
  value: { type: Number },
  type: { type: String },
  weight: { type: String, ref: 'weights' },
  category: { type: String, ref: 'categories' },
})

const Product = mongoose.model<IProduct>('products', productSchema)
export { Product }
