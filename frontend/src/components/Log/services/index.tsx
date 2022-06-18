import { api } from "../../../common/Utility";

export const getBankLog = (botId: string = '0') => {
  return new Promise((res, rej) => {
    const params = {
      type: 'getBankLog',
      botId: botId
    }

    api(params).done(res).catch(rej)
  })
}