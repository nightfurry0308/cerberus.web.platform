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