import mongoose from 'mongoose'
import { Product } from '../../collections/Product'

const deleteProduct = async (productID: string) => {
  try {
    const product = await Product.findOne({
      _id: new mongoose.Types.ObjectId(productID),
    })

    if (!product) {
      throw new Error('Preto não existe')
    }

    product.deleteOne()
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export { deleteProduct }
