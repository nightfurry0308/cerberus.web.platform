import { createContext, useState } from "react";
import { InjectStateType } from "../../../common/DataType"

export const InjectContext = createContext<any>({})

export const InjectProvider = ({ children }: { children: any }) => {
  const [state, setState] = useState<InjectStateType>({
    app: '',
    html: '',
    png: '',
    loading: true,
    previewData: '',
    previewModal: false,
    table: {
      rows: [],
      count: 0,
      perPage: '10',
      page: '1'
    }
  })

  return (
    <InjectContext.Provider value={{ state, setState }}>
      {children}
    </InjectContext.Provider>
  )
}