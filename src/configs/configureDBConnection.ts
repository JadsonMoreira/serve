import console from 'console'
import { connect } from 'mongoose'

export async function configureDBConnection() {
  try {
    await connect(process.env.DATABASE_URL as string)
    console.log(`Mongoose (MongoDB) conectado com sucesso`)
  } catch (error) {
    console.log('Falha ao conectar o Mongoose (MongoDB)')
  }
}
