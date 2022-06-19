import { createContext, useState } from "react";
import { AppStateType } from "../common/DataType"

export const AppContext = createContext<any>({})

export const AppProvider = ({ children }: { children: any }) => {
  const [appState, setAppState] = useState<AppStateType>({
    globalSetting: {
      botTableAutoUpdateTime: '0'
    }
  })

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppContext.Provider>
  )
}