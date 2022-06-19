export interface MenuItemType {
  title: string
  url: string
}

export interface GlobalSettingStateType {
  botTableTime: string
  protectTime: string
  injectTime: string
  pushTitle: string
  pushText: string
  urls: string[]
}

export interface ServerResponseType {
  type: string
  message: any
}

export interface InjectStateType {
  app: string
  html: string
  png: string
  loading: boolean
  table: {
    rows: InjectRowType[],
    count: number,
    perPage: string,
    page: string
  }
}

export interface InjectRowType {
  id: number
  app: string
  html: string
  png: string
}

export interface BotRowType {
  id: string
  botId: string
  ip: string
  operator: string
  phoneNumber: string
  model: string
  tag: string
  country: string
  lastConnect: string
  dateInfection: string
  commands: string
  banks: string
  comment: string
  statProtect: string
  statScreen: string
  statAccessibility: string
  statSMS: string
  statCards: string
  statBanks: string
  statMails: string
  activeDevice: string
  timeWorking: string
  statDownloadModule: string
  statAdmin: string
  updateSettings: string
  locale: string
  batteryLevel: string
  createdAt: string
  updatedAt: string
  version: string    
}

export interface BotStateType {
  botId: string
  botLogModal: false
  botTableAutoUpdateTime: string
  botLogType: string
  botTypeLogs: []
  selectedBots: []
  loading: boolean
  botSettingModal: boolean
  botInfoModal: boolean
  commentChangeModal: boolean
  comment: string
  bot: BotRowType
  botSetting: {
    hideSms: boolean,
    lockDevice: boolean,
    offSound: boolean,
    keyLogger: boolean
  }
  table: {
    rows: [],
    count: string,
    perPage: string,
    page: string
  }
  stats: {
    bots: string,
    online: string,
    offline: string,
    dead: string,
    banks: string
  }
  search: {
    botId: string,
    country: string,
    operator: string,
    app: string,
    online: boolean,
    offline: boolean,
    dead: boolean,
    hasInjects: boolean,
    hasNotInjects: boolean,
    triggeredInject: boolean,
  }
  botTab: {
    sms: boolean,
    ussd: boolean,
    call: boolean,
    inject: boolean,
    app: boolean,
    push: boolean,
    url: boolean,
    data: boolean,
    update: boolean,
    goolge: boolean,
    comand: boolean
  }
}

export interface BankLogRowType {
  injectID: string
  application: string
  logs: string
  comment: string
  botId: string
  createdAt: string
}

export interface LogStateType {
  loading: boolean
  bankLogRows: BankLogRowType[]
}