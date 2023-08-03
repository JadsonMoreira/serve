import { Product } from '../../collections/Product'

const listProduct = async (categoryID: string) => {
  try {
    console.log(categoryID)
    const products = await Product.find({ category: categoryID })
      .populate('category')
      .populate('weight')

    if (!products.length) {
      throw new Error('Não existe pratos com essa categoria')
    }

    return products
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export { listProduct }
