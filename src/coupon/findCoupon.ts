import { Coupon } from '../collections/Coupon'

const findCoupon = async (couponCode: string) => {
  try {
    const coupon = await Coupon.findOne({ code: couponCode })
    if (!coupon) throw new Error('Cupom não existe')
    return coupon
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export { findCoupon }
