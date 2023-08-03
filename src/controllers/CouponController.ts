import { FastifyReply, FastifyRequest } from 'fastify'

import { findCoupon } from '../coupon/findCoupon'

class CouponController {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  find = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { couponCode } = (request as any).query

      const create = await findCoupon(couponCode)
      reply.status(200).send({ message: 'Cupom valido', create })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

const couponController = new CouponController()

export { couponController }
