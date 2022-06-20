import { createContext, useState } from "react";
import { BotStateType } from "../../../common/DataType"

export const BotContext = createContext<any>({})

export const BotProvider = ({ children }: { children: any }) => {
  const [state, setState] = useState<BotStateType>({
    botId: '',
    selectedBots: [],
    loading: true,
    botSettingModal: false,
    botLogModal: false,
    botLogType: '',
    botTypeLogs: [],
    botInfoModal: false,
    commentChangeModal: false,
    comment: '',
    table: {
      rows: [],
      count: '0',
      perPage: '10',
      page: '1'
    },
    botSetting: {
      hideSms: false,
      lockDevice: false,
      offSound: false,
      keyLogger: false
    },
    search: {
      botId: '',
      country: '',
      operator: '',
      app: '',
      dead: false,
      online: false,
      offline: false,
      hasInjects: false,
      hasNotInjects: false,
      triggeredInject: false
    },
    stats: {
      log: '0',
      bots: '0',
      online: '0',
      offline: '0',
      dead: '0',
      banks: '0'
    },
    bot: {
      id: '',
      botId: '',
      ip: '',
      operator: '',
      phoneNumber: '',
      model: '',
      tag: '',
      country: '',
      lastConnect: '',
      dateInfection: '',
      commands: '',
      banks: '',
      comment: '',
      statProtect: '',
      statScreen: '',
      statAccessibility: '',
      statSMS: '',
      statCards: '',
      statBanks: '',
      statMails: '',
      activeDevice: '',
      timeWorking: '',
      statDownloadModule: '',
      statAdmin: '',
      updateSettings: '',
      locale: '',
      batteryLevel: '',
      createdAt: '',
      updatedAt: '',
      version: ''
    },
    botTab: {
      sms: false,
      ussd: false,
      call: false,
      inject: false,
      app: false,
      push: false,
      url: false,
      data: false,
      update: false,
      goolge: false,
      comand: false
    }
    })

  return (
    <BotContext.Provider value={{ state, setState }}>
      {children}
    </BotContext.Provider>
  )
}