import { FastifyReply } from 'fastify'
import { createProduct } from '../services/product/createProduct'
import { listProduct } from '../services/product/listProduct'
import { findProductId } from '../services/product/findProductId'
import { deleteProduct } from '../services/product/deleteProduct'

class ProductController {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  create = async (request: any, reply: FastifyReply) => {
    try {
      const { name, title, description, value, weight, category } = request.body

      const create = await createProduct(
        name,
        title,
        description,
        value,
        weight,
        category,
      )
      reply.status(200).send({ message: 'Produto criado com sucesso', create })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  list = async (request: any, reply: FastifyReply) => {
    try {
      const { category } = request.query

      const list = await listProduct(category)
      reply
        .status(200)
        .send({ message: 'Produto encontrados com sucesso', list })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  find = async (request: any, reply: FastifyReply) => {
    try {
      const { productID } = request.query

      const find = await findProductId(productID)
      reply
        .status(200)
        .send({ message: 'Produto encontrado com sucesso', find })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  delete = async (request: any, reply: FastifyReply) => {
    try {
      const { productID } = request.query

      await deleteProduct(productID)
      reply.code(200).send({ message: 'Produto deletado com sucesso' })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

const productController = new ProductController()

export { productController }
