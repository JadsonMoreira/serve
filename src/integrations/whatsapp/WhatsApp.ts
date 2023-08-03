import { AxiosInstance } from 'axios'
import ApiCaller from '../ApiCaller'

class WhatsApp {
  token: string
  api: AxiosInstance
  constructor() {
    this.token = process.env.TOKEN_CODE as string

    this.api = ApiCaller.getApi('whatsApp')
  }

  sendMessage = (contenct: any) => {
    return ApiCaller.getApi('whatsApp').post(
      '/103590536161301/messages',
      contenct,
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN_CODE as string}`,
          'Content-Type': 'application/json',
        },
      },
    )
  }
}

const whatsApp = new WhatsApp()

export { whatsApp }
