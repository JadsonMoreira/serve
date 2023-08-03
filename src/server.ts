import dotenv from 'dotenv'
import fastify from 'fastify'
import cors from '@fastify/cors'
import { Routes } from './routes/routers'
import { configureDBConnection } from './configs/configureDBConnection'
import ApiCaller from './integrations/ApiCaller'
dotenv.config()

const main = async () => {
  const app = fastify()

  await ApiCaller.loadApis(app)

  app.register(cors, {
    origin: true,
  })
  app.register(Routes)

  app
    .listen({
      port: 3333,
    })
    .then(() => {
      console.log(' HTTP server running on http://localhost:3333')
    })
  await configureDBConnection()
}

main()
