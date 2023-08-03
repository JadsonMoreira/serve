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
      host: '0.0.0.0',
      port: process.env.PORT ? Number(process.env.PORT) : 3333,
    })
    .then(() => {
      console.log(' HTTP server running')
    })
  await configureDBConnection()
}

main()
