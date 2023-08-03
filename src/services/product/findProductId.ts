import mongoose from 'mongoose'
import { Product } from '../../collections/Product'

const findProductId = async (productID: string) => {
  try {
    const product = await Product.findOne({
      _id: new mongoose.Types.ObjectId(productID),
    })
      .populate('category')
      .populate('weight')

    if (!product) {
      throw new Error('Produto não existe')
    }

    return product
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export { findProductId }
