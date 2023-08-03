import { FastifyInstance } from 'fastify'
import { productController } from '../controllers/ProductController'
import { orderController } from '../controllers/OrderController'
import { couponController } from '../controllers/CouponController'

export async function Routes(app: FastifyInstance) {
  // product
  app.post('/product', productController.create)
  app.get('/product', productController.list)
  app.get('/product/id', productController.find)
  app.delete('/products', productController.delete)

  // ORDER
  app.post('/order', orderController.create)
  app.get('/order', orderController.list)
  app.put('/order', orderController.finsh)

  // COUPON
  app.get('/coupon', couponController.find)
}
