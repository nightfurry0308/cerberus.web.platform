import { GlobalSettingStateType, ServerResponseType } from "../../../common/DataType"
import { api } from "../../../common/Utility"

export const getGlobalSetting = () => {
  return new Promise((res: (param: GlobalSettingStateType) => void, rej) => {
    const params = {
      type: 'getGlobalSetting'
    }

    api(params).done(res).catch(rej)
  })
}

export const setGlobalSetting = (state: GlobalSettingStateType) => {
  return new Promise((res: (param: ServerResponseType) => void, rej) => {
    const params = {
      ...state,
      type: 'setGlobalSetting'
    }

    api(params).done(res).catch(rej)
  })
}