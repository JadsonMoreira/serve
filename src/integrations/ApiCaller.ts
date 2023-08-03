import { FastifyInstance } from 'fastify'

import config from '../configs/config.json'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

class ApiCaller {
  callers: any

  constructor() {
    this.callers = {}
  }

  loadApis = async (app: FastifyInstance) => {
    for (const api of config.apis) {
      this.callers[api.name] = axios.create({
        baseURL: api.base_url,
        timeout: api.timeout,
        headers: {
          common: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Accept-Encoding': 'gzip,deflate,compress',
          },
        },
      })

      this.callers[api.name].interceptors.request.use(
        (request: AxiosRequestConfig) => {
          console.log(`------------ CHAMADA ------------
            
            base: ${request.baseURL}
            url: ${request.url}
            headers: ${JSON.stringify(request.headers)}
            body: ${JSON.stringify(request.data)}`)

          return request
        },
      )
      this.callers[api.name].interceptors.response.use(
        (response: AxiosResponse) => {
          console.log(`------------ RETORNO ------------
            
            base: ${response.config.url}
            url: ${response.status}
            headers: ${JSON.stringify(response.config.headers)}
            body: ${JSON.stringify(response.data)}`)

          return response
        },
      )
    }
  }

  getApi = (apiName: string) => {
    return this.callers[apiName]
  }
}

export default new ApiCaller()
