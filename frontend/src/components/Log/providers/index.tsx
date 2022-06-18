import { createContext, useState } from "react";
import { LogStateType } from "../../../common/DataType"

export const LogContext = createContext<any>({})

export const LogProvider = ({ children }: { children: any }) => {
  const [state, setState] = useState<LogStateType>({
    loading: true,
    bankLogRows: []
  })

  return (
    <LogContext.Provider value={{ state, setState }}>
      {children}
    </LogContext.Provider>
  )
}