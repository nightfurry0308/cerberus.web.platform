import { ServerResponseType } from "../../../common/DataType";
import { api } from "../../../common/Utility";

export const getBankLog = (botId: string = '', injectId: string = '') => {
  return new Promise((res, rej) => {
    const params = {
      type: 'getBankLog',
      botId: botId,
      injectId: injectId
    }

    api(params).done(res).catch(rej)
  })
}

export const deleteBankLog = (id: string) => {
  return new Promise((res: (param: ServerResponseType) => void, rej) => {
    const params = {
      type: 'deleteBankLog',
      id: id
    }

    api(params).done(res).catch(rej)
  })
}

export const deleteAllBankLog = () => {
  return new Promise((res: (param: ServerResponseType) => void, rej) => {
    const params = {
      type: 'deleteAllBankLog'
    }

    api(params).done(res).catch(rej)
  })
}