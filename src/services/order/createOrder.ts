import mongoose from 'mongoose'
import { Product } from '../../collections/Product'
import { Order } from '../../collections/Order'
import { StatusOrderEnum } from '../../enum/StatusOrderEnum'
import { Coupon } from '../../collections/Coupon'
import { sendMessageWhatsApp } from './sendMessageWhatsApp'
import { genereteToken } from '../../utils/genereteToken'

const createOrder = async (
  products: any[],
  typePayment: string,
  address: string,
  user: string,
  delivery?: boolean,
  withdrawalEstablishment?: boolean,
  couponCode?: string,
) => {
  try {
    const dataAtual = new Date()
    // Subtrai 3 horas da data atual
    dataAtual.setHours(dataAtual.getHours() - 3)

    let totalPartial = 0

    let taxDelivery = process.env.TAX_FREIGHT

    if (withdrawalEstablishment || !delivery) {
      taxDelivery = String(0)
    }

    for (const product of products) {
      const productsList = await Product.findOne({
        _id: new mongoose.Types.ObjectId(product.id),
      })

      if (!productsList) {
        throw new Error('Produto não existe')
      }

      totalPartial += productsList.value
    }
    let cupom

    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode })
      if (!coupon) {
        throw new Error('Cupom não existe')
      } else if (coupon && coupon.active === false) {
        throw new Error('Cupom não esta ativado')
      }

      cupom = coupon
    }

    const totalValue =
      totalPartial + Number(taxDelivery) - Number(cupom ? cupom.value : 0)

    const tokenGerado = genereteToken()

    const order = await Order.create({
      products,
      status: StatusOrderEnum.CREATE,
      date: dataAtual,
      user,
      number: tokenGerado,
      paymentForm: typePayment,
      totalPartial,
      totalFreight: taxDelivery,
      total: totalValue,
      delivery,
      withdrawalEstablishment,
      address,
      'discount.id': cupom ? cupom._id : undefined,
      'discount.value': cupom ? cupom.value : undefined,
      'discount.type': cupom ? 'CUPOM' : undefined,
    })

    await sendMessageWhatsApp(order)

    return order
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export { createOrder }
