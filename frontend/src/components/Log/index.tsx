import { useContext } from "react";
import { LogContext } from './providers';
import { Skeleton, Divider } from "antd";
import { useEffect } from "react";
import { getBankLog } from "./services";
import { LogStateType } from "../../common/DataType";
import { changeResponseToClient } from '../../common/Utility';
import { Base64 } from "js-base64";
import {
  BankOutlined
} from '@ant-design/icons';

const LoadingSkelton = ({ count }: { count: number }) => {
  return (
    <>
      {
        Array.from(Array(count)).map((v, i) => <Skeleton key={i} />)
      }
    </>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const { state, setState } = useContext(LogContext)

  const load = () => {
    setState((state: LogStateType) => {
      return {
        ...state,
        loading: true
      }
    })

    getBankLog().then((res: any) => {
      setState((state: LogStateType) => {
        let rows = res.map((row: any) => changeResponseToClient(row))
        return {
          ...state,
          bankLogRows: rows.map((row: any) => ({...row, logs: JSON.parse(Base64.decode(row.logs))})),
          loading: false
        }
      })
    })
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      {
        state.loading ?
          (<LoadingSkelton count={5} />) : (
            <div>
              {
                state.bankLogRows.map((row:any) => {
                  return (
                    <div>
                      <span className="text-orange-600 cursor-pointer hover:text-orange-400 duration-300">{row.botId}</span>
                      <div className="flex text-stone-200"><BankOutlined className='mt-1' />&nbsp;<span className="">{row.application}</span></div>
                      <p>
                        {
                          Object.keys(row.logs).map((key:string) => {
                            return (
                              <div className="text-stone-500 cursor-default">
                                {key} : <span className="hover:text-stone-400 duration-300">{row.logs[key]}</span>
                              </div>
                            )
                          })
                        }
                      <span className="text-stone-500 float-right">{new Date(row.createdAt).toLocaleString()}</span>
                      </p>
                      <Divider/>
                    </div>
                  )
                })
              }
            </div>
            // <List
            //   itemLayout="horizontal"
            //   dataSource={state.bankLogRows}
            //   renderItem={(item: BankLogRowType) => (
            //     <List.Item>
            //       <List.Item.Meta
            //         avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
            //         title={<span className="text-orange-800">{item.botId}</span>}
            //         description={Base64.decode(item.logs)}
            //       />
            //       <span className="text-stone-500">{new Date(item.createdAt).toLocaleDateString()}</span>
            //     </List.Item>
            //   )}
            // />
          )
      }


    </>

  )
}