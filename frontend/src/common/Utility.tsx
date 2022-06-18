import { Base64 } from "js-base64"
import $ from "jquery"

import {webHost} from '../config'

export const generateParam = (params: any) => Base64.encode(JSON.stringify(params))

export const api = (params: any, url: string = webHost, method: string = 'post') => $.ajax({
  url: url,
  method: method,
  data: { params: generateParam(params) }
})

export const changeResponseToClient = (params: any) => {
  let response: any = {}

  Object.keys(params).map((key: string) => {
    let keyArray = key.split('_')
    let newKey:string = key

    if (keyArray.length != 1) {
      newKey = keyArray[0]

      keyArray = keyArray.slice(1)

      newKey += keyArray.map((key: string) => key.charAt(0).toUpperCase() + key.slice(1)).join('')
    }

    response[newKey] = params[key]
  })

  return response
}