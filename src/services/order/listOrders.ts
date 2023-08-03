import { Order } from '../../collections/Order'
import { StatusOrderEnum } from '../../enum/StatusOrderEnum'

const listOrders = async () => {
  try {
    const orders = await Order.find({ status: StatusOrderEnum.CREATE })

    if (!orders) throw new Error('Não existe pedidos ')
    return orders
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export { listOrders }
