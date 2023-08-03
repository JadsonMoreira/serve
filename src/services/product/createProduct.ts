import mongoose from 'mongoose'
import { Category } from '../../collections/Category'
import { Product } from '../../collections/Product'
import { Weight } from '../../collections/Weight'

const createProduct = async (
  name: string,
  title: string,
  description: string,
  value: number,
  weight: string,
  category: string,
) => {
  try {
    const categoryField = await Category.findOne({
      _id: new mongoose.Types.ObjectId(category),
    })

    if (!categoryField) {
      throw new Error('Categoria não existe')
    }

    const weightField = await Weight.findOne({
      _id: new mongoose.Types.ObjectId(weight),
    })

    if (!weightField) {
      throw new Error('Peso não existe')
    }

    const findProduct = await Product.findOne({ name })

    if (findProduct) {
      throw new Error('Você já cadastrou um produto com esse nome')
    }

    const product = await Product.create({
      name,
      title,
      description,
      value,
      weight: weightField._id,
      category: categoryField._id,
    })
    return product
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export { createProduct }
