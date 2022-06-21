import { InjectRowType, ServerResponseType } from "../../../common/DataType";
import { api } from "../../../common/Utility";

export const createInject = (app: string, html: string, png: string) => {
  return new Promise((res: (param: ServerResponseType) => void, rej) => {
    const params = {
      type: 'createInject',
      app: app,
      html: html,
      png: png
    }

    api(params).done(res).catch(rej)
  })
}

export const getInjectList = (page: number = 1, perPage: number = 10) => {
  return new Promise((res, rej) => {
    const params = {
      type: 'getInjectList',
      page: page,
      perPage: perPage
    }

    api(params).done(res).catch(rej)
  })
}

export const deleteInject = (id: number) => {
  return new Promise((res: (param: ServerResponseType) => void, rej) => {
    const params = {
      type: 'deleteInject',
      id: id
    }

    api(params).done(res).catch(rej)
  })
}

export const showInject = (id: number) => {
  return new Promise((res: (params :InjectRowType) => void, rej) => {
    const params = {
      type: 'showInject',
      id: id
    }

    api(params).done(res).catch(rej)
  })
}