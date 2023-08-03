import { FastifyReply, FastifyRequest } from 'fastify'
import { createOrder } from '../services/order/createOrder'
import { listOrders } from '../services/order/listOrders'
import { finishOrder } from '../services/order/finishOrder'

class OrderController {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  create = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const {
        products,
        typePayment,
        address,
        user,
        delivery,
        withdrawalEstablishment,
        couponCode,
      } = (request as any).body
      console.log(typePayment)

      const create = await createOrder(
        products,
        typePayment,
        address,
        user,
        delivery,
        withdrawalEstablishment,
        couponCode,
      )
      reply.status(200).send({ message: 'Pedido criado com sucesso', create })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  list = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const list = await listOrders()
      reply
        .status(200)
        .send({ message: 'Pedidos encontrados com sucesso', list })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  finsh = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { orderID } = (request as any).body
      const finsh = await finishOrder(orderID)
      reply
        .status(200)
        .send({ message: 'Pedido finalizado com sucesso', finsh })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

const orderController = new OrderController()

export { orderController }
