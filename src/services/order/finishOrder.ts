import mongoose from 'mongoose'
import { Order } from '../../collections/Order'
import { StatusOrderEnum } from '../../enum/StatusOrderEnum'
import { whatsApp } from '../../integrations/whatsapp/WhatsApp'

const finishOrder = async (orderID: string) => {
  try {
    const order = await Order.findOne({
      _id: new mongoose.Types.ObjectId(orderID),
    })
    if (!order) return

    order.status = StatusOrderEnum.FINISH

    let text = ''
    if (order.delivery) {
      text =
        'huummm 😋... Segura a fome aí Jadson, seu pedido já saiu pra entrega 🏍'
    } else {
      text = 'huummm 😋... Seu pedido já está pronto, pode vir buscar 😉'
    }

    const finishOrder = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: `+55 ${order.user?.phone}`,
      type: 'text',
      text: { body: text },
    }

    await whatsApp.sendMessage(finishOrder)
    await order.save()
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export { finishOrder }
